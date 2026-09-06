

const Game = {
  
  now() { return (typeof nowMs === "function") ? nowMs() : Date.now(); },

  /** Chuẩn hóa timestamp từ number / string / Firebase Timestamp → ms (number) hoặc null */
  toMs(val) {
    if (val == null || val === '') return null;
    if (typeof val === 'number') return Number.isFinite(val) && val > 0 ? val : null;
    if (typeof val === 'string') {
      const n = Number(val);
      return Number.isFinite(n) && n > 0 ? n : null;
    }
    if (typeof val === 'object') {
      // Firebase Timestamp (admin SDK / client)
      if (typeof val.toMillis === 'function') {
        try { const m = val.toMillis(); return Number.isFinite(m) && m > 0 ? m : null; } catch (_) {}
      }
      if (val.seconds != null) {
        const sec = Number(val.seconds);
        const nano = Number(val.nanoseconds) || 0;
        if (Number.isFinite(sec)) return sec * 1000 + Math.floor(nano / 1e6);
      }
      if (val._seconds != null) {
        const sec = Number(val._seconds);
        const nano = Number(val._nanoseconds) || 0;
        if (Number.isFinite(sec)) return sec * 1000 + Math.floor(nano / 1e6);
      }
    }
    const n = Number(val);
    return Number.isFinite(n) && n > 0 ? n : null;
  },

  
  raining: false,
  rainUntil: 0,
  nextRainAt: 0,
  RAIN_INTERVAL_MS: 30 * 60 * 1000,
  rainBoostPens: {}, 

  getPlayer() { return currentPlayer; },
  getAnimals() { return currentAnimals; },
  getAnimal(id) {
    if (id == null || id === '') return null;
    const s = String(id);
    const list = (typeof currentAnimals !== 'undefined' && currentAnimals && currentAnimals.length)
      ? currentAnimals
      : (typeof DEFAULT_ANIMALS !== 'undefined' ? DEFAULT_ANIMALS : []);
    return list.find(p => p && (p.id === id || String(p.id) === s)) || null;
  },
  FEED_ID_ALIASES: {
    'phan-thuong': 'cam-thuong',
    'phan-xanh': 'cam-xanh',
    'phan-vang': 'cam-vang',
    'phan-do': 'cam-do'
  },

  normalizeFeedId(id) {
    if (!id) return id;
    const s = String(id);
    return (this.FEED_ID_ALIASES && this.FEED_ID_ALIASES[s]) || s;
  },

  getFeed(id) {
    const nid = this.normalizeFeedId(id);
    return DEFAULT_FEEDS.find(f => f.id === id || f.id === nid) || null;
  },
  getFeeds() { return DEFAULT_FEEDS; },
  getProtect(id) { return DEFAULT_PROTECTS.find(p => p.id === id); },
  getProtects() { return DEFAULT_PROTECTS; },
  getFairyPacks() { return DEFAULT_FAIRY_PACKS; },
  getHelperPacks() { return (typeof DEFAULT_HELPER_PACKS !== 'undefined') ? DEFAULT_HELPER_PACKS : []; },
  getNycPacks() { return DEFAULT_NYC_PACKS; },
  getPets() { return typeof getPets === 'function' ? getPets() : (typeof DEFAULT_PETS !== 'undefined' ? DEFAULT_PETS : []); },
  getAvatarFrames() { return typeof getAvatarFrames === 'function' ? getAvatarFrames() : (typeof DEFAULT_AVATAR_FRAMES !== 'undefined' ? DEFAULT_AVATAR_FRAMES : []); },
  getAvatarFrame(id) { return this.getAvatarFrames().find(f => f.id === id); },
  getCompanions() { return typeof getCompanions === 'function' ? getCompanions() : (typeof DEFAULT_COMPANIONS !== 'undefined' ? DEFAULT_COMPANIONS : []); },
  getCompanion(id) { return this.getCompanions().find(c => c.id === id); },

  
  isUnlimitedResources() {
    return !!(currentPlayer && currentPlayer.unlimitedResources);
  },
  canAfford(cost) {
    if (this.isUnlimitedResources()) return true;
    return (Number(currentPlayer && currentPlayer.coins) || 0) >= (Number(cost) || 0);
  },
  
  chargeCoins(cost) {
    cost = Math.max(0, Number(cost) || 0);
    if (this.isUnlimitedResources()) return true;
    if (!currentPlayer || (Number(currentPlayer.coins) || 0) < cost) return false;
    currentPlayer.coins = (Number(currentPlayer.coins) || 0) - cost;
    currentPlayer.stats = currentPlayer.stats || {};
    currentPlayer.stats.spent = (currentPlayer.stats.spent || 0) + cost;
    return true;
  },

  getAvatarBadges() { return typeof getAvatarBadges === 'function' ? getAvatarBadges() : (typeof DEFAULT_AVATAR_BADGES !== 'undefined' ? DEFAULT_AVATAR_BADGES : []); },
  getAvatarBadge(id) {
    if (!id) return null;
    const found = this.getAvatarBadges().find(b => b.id === id);
    if (found) return found;
    
    const slug = String(id).replace(/^ab-/, '').replace(/^fa-/, '');
    if (!slug) return null;
    const fa = (typeof faProClass === 'function') ? faProClass(slug) : ('fa-solid fa-' + slug);
    return {
      id: 'ab-' + slug,
      fa,
      slug,
      name: slug,
      price: 400,
      rarity: 'common',
      desc: 'Icon FA · ' + slug
    };
  },



  getPet(id) { return this.getPets().find(p => p.id === id); },
  getRecipes() { return typeof getKitchenRecipes === 'function' ? getKitchenRecipes() : []; },
  getRecipe(id) { return this.getRecipes().find(r => r.id === id); },
  getSettings() { return currentSettings; },

  
  MAX_PENS_PER_FARM: 99,

  makeEmptyPens(count) {
    const n = Math.max(1, count || (currentSettings && currentSettings.penCount) || 4);
    return Array.from({ length: n }, (_, i) => ({
      id: i,
      animalId: null,
      raisedAt: null,
      watered: false,
      waterCount: 0,
      lastWatered: null,
      feedId: null
    }));
  },

  ensureFarms() {
    try { if (typeof migratePlayerSchema === 'function' && currentPlayer) migratePlayerSchema(currentPlayer); } catch (_) {}

    if (!currentPlayer) return;

    // Firebase đôi khi lưu farms dạng object {0:[],1:[]} thay vì array
    if (currentPlayer.farms && !Array.isArray(currentPlayer.farms) && typeof currentPlayer.farms === 'object') {
      const keys = Object.keys(currentPlayer.farms).sort((a, b) => Number(a) - Number(b));
      currentPlayer.farms = keys.map(k => currentPlayer.farms[k]);
    }

    if (!Array.isArray(currentPlayer.farms) || !currentPlayer.farms.length) {
      let pens = currentPlayer.pens;
      if (!Array.isArray(pens)) pens = Object.values(pens || {});
      if (!pens.length) pens = this.makeEmptyPens();
      // Chỉ normalize id, giữ nguyên object ô (không clone oan)
      pens.forEach((p, i) => {
        if (p && typeof p === 'object' && typeof p.id !== 'number') p.id = i;
      });
      currentPlayer.farms = [pens];
    } else {
      // Chỉ sửa cấu trúc hỏng — KHÔNG clone lại toàn bộ ô mỗi lần gọi
      // (clone liên tục làm pens lệch reference → chuyển trại ghi đè nhầm)
      for (let gi = 0; gi < currentPlayer.farms.length; gi++) {
        let g = currentPlayer.farms[gi];
        let pens;
        if (Array.isArray(g)) {
          pens = g;
        } else if (g && Array.isArray(g.pens)) {
          pens = g.pens;
        } else if (g && typeof g === 'object') {
          const keys = Object.keys(g).filter(k => /^\d+$/.test(k)).sort((a, b) => Number(a) - Number(b));
          pens = keys.length ? keys.map(k => g[k]) : [];
        } else {
          pens = [];
        }
        // Không xóa trại đang có con chỉ vì parse lỗi tạm thời
        if (!pens.length && Array.isArray(g) && g.length === 0) {
          // thật sự trống — giữ [] hoặc starter tùy logic cũ
          pens = this.makeEmptyPens();
        } else if (!pens.length && g && typeof g === 'object' && !Array.isArray(g)) {
          pens = this.makeEmptyPens();
        }
        if (Array.isArray(pens)) {
          for (let i = 0; i < pens.length; i++) {
            if (pens[i] && typeof pens[i] === 'object' && typeof pens[i].id !== 'number') {
              pens[i].id = i;
            }
          }
          currentPlayer.farms[gi] = pens;
        }
      }
    }

    // Tách reference trùng giữa các trại (Firebase / sync lỗi có thể làm 2 trại cùng 1 mảng → mất ô)
    if (Array.isArray(currentPlayer.farms) && currentPlayer.farms.length > 1) {
      const seen = new Map();
      for (let gi = 0; gi < currentPlayer.farms.length; gi++) {
        const arr = currentPlayer.farms[gi];
        if (!Array.isArray(arr)) continue;
        if (seen.has(arr)) {
          // Clone nông từng ô — giữ dữ liệu hiện có, không còn share mảng
          currentPlayer.farms[gi] = arr.map((p, idx) => {
            if (p && typeof p === 'object') {
              const c = Object.assign({}, p);
              c.id = idx;
              return c;
            }
            return {
              id: idx, animalId: null, raisedAt: null, watered: false,
              waterCount: 0, lastWatered: null, feedId: null
            };
          });
        } else {
          seen.set(arr, gi);
        }
      }
    }

    if (typeof currentPlayer.activeFarm !== 'number' || currentPlayer.activeFarm < 0 || isNaN(currentPlayer.activeFarm)) {
      currentPlayer.activeFarm = 0;
    }
    if (currentPlayer.activeFarm >= currentPlayer.farms.length) {
      currentPlayer.activeFarm = Math.max(0, currentPlayer.farms.length - 1);
    }

    this.refreshFarmUnlocks();

    // Chuẩn hóa từng ô: timestamp & hệ số tốc độ về number (Firebase hay trả string / Timestamp object)
    for (let gi = 0; gi < currentPlayer.farms.length; gi++) {
      const pens = currentPlayer.farms[gi];
      if (!Array.isArray(pens)) continue;
      for (let i = 0; i < pens.length; i++) {
        const p = pens[i];
        if (!p || typeof p !== 'object') continue;
        if (p.raisedAt != null) {
          p.raisedAt = this.toMs(p.raisedAt);
        }
        if (p.lastWatered != null) {
          p.lastWatered = this.toMs(p.lastWatered);
        }
        if (p.feedAt != null) {
          p.feedAt = this.toMs(p.feedAt);
        }
        if (p.specialMult != null) p.specialMult = Number(p.specialMult) || 1;
        if (p.specialMultPermanent != null) p.specialMultPermanent = Number(p.specialMultPermanent) || 1;
        if (p.specialMultTemp != null) p.specialMultTemp = Number(p.specialMultTemp) || 1;
        if (p.specialMultUntil != null) {
          p.specialMultUntil = this.toMs(p.specialMultUntil);
        }
        // Đồng bộ: nếu có tốc độ >1 mà chưa có permanent → gán permanent (tránh offline mất buff)
        const sm = Number(p.specialMult) || 1;
        const sp = Number(p.specialMultPermanent) || 0;
        const until = Number(p.specialMultUntil) || 0;
        const nowT = (typeof nowMs === 'function' ? nowMs() : Date.now());
        if (sm > 1 && sp < sm && (!until || until <= nowT)) {
          p.specialMultPermanent = sm;
        }
        if ((Number(p.specialMultPermanent) || 0) > 1) {
          p.specialMult = Math.max(Number(p.specialMult) || 1, Number(p.specialMultPermanent) || 1);
        }
        // Ép permanent x50+ luôn giữ floor (tránh mất tốc độ offline)
        if ((Number(p.specialMultPermanent) || 0) >= 2) {
          p.specialMult = Math.max(Number(p.specialMult) || 1, Number(p.specialMultPermanent) || 1);
        }
        // Backfill baseRaiseTime cho con đang nuôi (phục vụ offline khi thiếu định nghĩa động vật)
        if (p.animalId && !(Number(p.baseRaiseTime) > 0)) {
          try {
            const anDef = this.getAnimal(p.animalId);
            if (anDef && Number(anDef.raiseTime) > 0) p.baseRaiseTime = Number(anDef.raiseTime);
          } catch (_) {}
        }
        if (typeof p.waterCount !== 'number') p.waterCount = p.watered ? 3 : 0;
        if (typeof p.id !== 'number') p.id = i;
      }
    }

    // Đồng bộ pens với trại đang active (cùng reference)
    const ai = currentPlayer.activeFarm;
    if (Array.isArray(currentPlayer.farms[ai])) {
      currentPlayer.pens = currentPlayer.farms[ai];
    }
  },

  
  refreshFarmUnlocks() {
    if (!currentPlayer || !Array.isArray(currentPlayer.farms)) return;
    const max = this.MAX_PENS_PER_FARM;
    let guard = 0;
    while (guard++ < 30) {
      const last = currentPlayer.farms[currentPlayer.farms.length - 1];
      if (last && last.length >= max) {
        currentPlayer.farms.push(this.makeEmptyPens());
      } else break;
    }
  },

  syncActiveFarm() {
    if (!currentPlayer || !Array.isArray(currentPlayer.farms)) return;
    const i = (typeof currentPlayer.activeFarm === 'number' && currentPlayer.activeFarm >= 0)
      ? currentPlayer.activeFarm
      : 0;
    if (!Array.isArray(currentPlayer.pens)) return;
    if (i < 0 || i >= currentPlayer.farms.length) return;

    // pens đang trỏ nhầm sang trại khác → kéo về đúng slot, không ghi đè
    for (let j = 0; j < currentPlayer.farms.length; j++) {
      if (j !== i && currentPlayer.pens === currentPlayer.farms[j]) {
        currentPlayer.pens = currentPlayer.farms[i];
        return;
      }
    }

    if (currentPlayer.pens === currentPlayer.farms[i]) {
      return;
    }

    const existing = currentPlayer.farms[i];
    // Không bao giờ ghi đè trại đang nhiều ô bằng mảng ngắn hơn (trừ khi cùng nội dung mở rộng hợp lệ)
    if (Array.isArray(existing) && existing.length > currentPlayer.pens.length) {
      // Giữ trại dài, đồng bộ pens theo trại
      currentPlayer.pens = existing;
      return;
    }

    currentPlayer.farms[i] = currentPlayer.pens;
  },

  getFarmCount() {
    this.ensureFarms();
    return currentPlayer.farms.length;
  },

  getActiveFarmIndex() {
    this.ensureFarms();
    return currentPlayer.activeFarm || 0;
  },

  switchFarm(index) {
    if (!currentPlayer) return { ok: false, msg: 'Chưa đăng nhập!' };
    this.ensureFarms();
    const prev = (typeof currentPlayer.activeFarm === 'number') ? currentPlayer.activeFarm : 0;
    // Chỉ ghi pens vào trại prev nếu không phải reference của trại khác và không làm ngắn bất thường
    if (Array.isArray(currentPlayer.pens) && prev >= 0 && prev < currentPlayer.farms.length) {
      let pointsElsewhere = false;
      for (let j = 0; j < currentPlayer.farms.length; j++) {
        if (j !== prev && currentPlayer.pens === currentPlayer.farms[j]) {
          pointsElsewhere = true;
          break;
        }
      }
      const existing = currentPlayer.farms[prev];
      const wouldShrink = Array.isArray(existing) && existing.length > currentPlayer.pens.length;
      if (!pointsElsewhere && !wouldShrink) {
        currentPlayer.farms[prev] = currentPlayer.pens;
      }
    }
    index = parseInt(index, 10);
    if (isNaN(index) || index < 0 || index >= currentPlayer.farms.length) {
      return { ok: false, msg: 'Trại chưa mở khóa! Cần đủ 99 ô ở trại trước.' };
    }
    if (!Array.isArray(currentPlayer.farms[index])) {
      return { ok: false, msg: 'Dữ liệu Trại ' + (index + 1) + ' lỗi. Thử tải lại trang.' };
    }
    currentPlayer.activeFarm = index;
    currentPlayer.pens = currentPlayer.farms[index];
    return { ok: true, msg: 'Đã chuyển sang Trại ' + (index + 1) };
  },

  
  forEachFarm(fn) {
    if (!currentPlayer) return;
    this.ensureFarms();
    this.syncActiveFarm();
    const active = currentPlayer.activeFarm || 0;
    currentPlayer.farms.forEach((pens, i) => {
      currentPlayer.activeFarm = i;
      currentPlayer.pens = pens;
      fn(pens, i);
      currentPlayer.farms[i] = currentPlayer.pens;
    });
    currentPlayer.activeFarm = active;
    currentPlayer.pens = currentPlayer.farms[active];
  },


  
  hasFairy() {
    return !!(currentPlayer && currentPlayer.fairyUntil && currentPlayer.fairyUntil > (typeof nowMs==="function"?nowMs():Date.now()));
  },

  
  isFairyActive() {
    return this.hasFairy() && this.getBuffPrefs().fairyEnabled;
  },

  
  showFairyDecor() {
    return this.hasFairy() && !!this.getBuffPrefs().fairyVisual;
  },
  showNycDecor() {
    return this.hasNyc() && !!this.getBuffPrefs().nycVisual;
  },
  showHelperDecor() {
    return this.hasHelper() && !!this.getBuffPrefs().helperVisual;
  },

  fairyRemainingSec() {
    if (!this.hasFairy()) return 0;
    return Math.max(0, Math.ceil((currentPlayer.fairyUntil - (typeof nowMs==="function"?nowMs():Date.now())) / 1000));
  },

  
  hasNyc() {
    if (!currentPlayer) return false;
    const until = this.toMs(currentPlayer.nycUntil) || Number(currentPlayer.nycUntil) || 0;
    return until > (typeof nowMs === 'function' ? nowMs() : Date.now());
  },

  
  isNycActive() {
    return this.hasNyc() && this.getBuffPrefs().nycEnabled;
  },

  
  isNycActiveAt(t) {
    if (!currentPlayer || !this.getBuffPrefs().nycEnabled) return false;
    const until = this.toMs(currentPlayer.nycUntil) || Number(currentPlayer.nycUntil) || 0;
    return until > (Number(t) || 0);
  },

  
  isFairyActiveAt(t) {
    if (!currentPlayer || !this.getBuffPrefs().fairyEnabled) return false;
    const until = this.toMs(currentPlayer.fairyUntil) || Number(currentPlayer.fairyUntil) || 0;
    return until > (Number(t) || 0);
  },

  nycRemainingSec() {
    if (!this.hasNyc()) return 0;
    return Math.max(0, Math.ceil((currentPlayer.nycUntil - (typeof nowMs==="function"?nowMs():Date.now())) / 1000));
  },

  getBuffPrefs() {
    const def = { fairyEnabled: true, nycEnabled: true, helperEnabled: true, fairyVisual: true, nycVisual: true, helperVisual: true };
    if (!currentPlayer) return { ...def };
    if (!currentPlayer.buffPrefs || typeof currentPlayer.buffPrefs !== 'object') {
      currentPlayer.buffPrefs = { ...def };
    }
    const p = currentPlayer.buffPrefs;
    if (typeof p.fairyEnabled !== 'boolean') p.fairyEnabled = true;
    if (typeof p.nycEnabled !== 'boolean') p.nycEnabled = true;
    if (typeof p.helperEnabled !== 'boolean') p.helperEnabled = true;
    if (typeof p.fairyVisual !== 'boolean') p.fairyVisual = true;
    if (typeof p.nycVisual !== 'boolean') p.nycVisual = true;
    if (typeof p.helperVisual !== 'boolean') p.helperVisual = true;
    return p;
  },

  setBuffPrefs(prefs) {
    if (!currentPlayer) return { ok: false, msg: 'Chưa đăng nhập!' };
    const cur = this.getBuffPrefs();
    currentPlayer.buffPrefs = {
      fairyEnabled: prefs && typeof prefs.fairyEnabled === 'boolean' ? prefs.fairyEnabled : cur.fairyEnabled,
      nycEnabled: prefs && typeof prefs.nycEnabled === 'boolean' ? prefs.nycEnabled : cur.nycEnabled,
      helperEnabled: prefs && typeof prefs.helperEnabled === 'boolean' ? prefs.helperEnabled : cur.helperEnabled,
      fairyVisual: prefs && typeof prefs.fairyVisual === 'boolean' ? prefs.fairyVisual : cur.fairyVisual,
      nycVisual: prefs && typeof prefs.nycVisual === 'boolean' ? prefs.nycVisual : cur.nycVisual,
      helperVisual: prefs && typeof prefs.helperVisual === 'boolean' ? prefs.helperVisual : cur.helperVisual
    };
    const a = [];
    a.push('Tiên hình:' + (currentPlayer.buffPrefs.fairyVisual ? 'bật' : 'tắt') + '/buff:' + (currentPlayer.buffPrefs.fairyEnabled ? 'bật' : 'tắt'));
    a.push('NYC hình:' + (currentPlayer.buffPrefs.nycVisual ? 'bật' : 'tắt') + '/buff:' + (currentPlayer.buffPrefs.nycEnabled ? 'bật' : 'tắt'));
    a.push('Giúp việc hình:' + (currentPlayer.buffPrefs.helperVisual ? 'bật' : 'tắt') + '/buff:' + (currentPlayer.buffPrefs.helperEnabled ? 'bật' : 'tắt'));
    return { ok: true, msg: 'Đã lưu: ' + a.join(' · ') };
  },

  getNycConfig() {
    const def = { animalId: null, seedKind: 'normal', mode: 'all', count: 1, farmsEnabled: {}, byFarm: {}, customName: '', gender: 'female' };
    if (!currentPlayer) return { ...def };
    if (!currentPlayer.nycConfig || typeof currentPlayer.nycConfig !== 'object') {
      currentPlayer.nycConfig = { ...def };
    }
    if (!currentPlayer.nycConfig.seedKind) currentPlayer.nycConfig.seedKind = 'normal';
    if (!currentPlayer.nycConfig.farmsEnabled || typeof currentPlayer.nycConfig.farmsEnabled !== 'object') {
      currentPlayer.nycConfig.farmsEnabled = {};
    }
    if (!currentPlayer.nycConfig.byFarm || typeof currentPlayer.nycConfig.byFarm !== 'object') {
      currentPlayer.nycConfig.byFarm = {};
    }
    if (typeof currentPlayer.nycConfig.customName !== 'string') currentPlayer.nycConfig.customName = '';
    if (currentPlayer.nycConfig.gender !== 'male' && currentPlayer.nycConfig.gender !== 'female') {
      currentPlayer.nycConfig.gender = 'female';
    }
    return currentPlayer.nycConfig;
  },

  
  getNycConfigForFarm(farmIndex) {
    const base = this.getNycConfig();
    const key = String(farmIndex);
    const ov = (base.byFarm && (base.byFarm[key] || base.byFarm[farmIndex])) || null;
    // Chỉ dùng cấu hình của ĐÚNG trại này — không lấy con từ trại khác
    let animalId = null;
    let seedKind = 'normal';
    let mode = 'all';
    let count = 1;
    const normKind = (k) => (k === 'myth' || k === 'star') ? k : 'normal';
    if (ov && typeof ov === 'object') {
      animalId = ov.animalId || null;
      seedKind = normKind(ov.seedKind);
      mode = ov.mode === 'count' ? 'count' : 'all';
      count = typeof ov.count === 'number' ? ov.count : 1;
    } else {
      // Chưa có byFarm riêng → dùng cấu hình gốc (animalId chung)
      animalId = base.animalId || null;
      seedKind = normKind(base.seedKind);
      mode = base.mode === 'count' ? 'count' : 'all';
      count = typeof base.count === 'number' ? base.count : 1;
    }
    return { ...base, animalId, seedKind, mode, count, _farmIndex: farmIndex };
  },

  setNycConfig(cfg) {
    if (!currentPlayer) return { ok: false, msg: 'Chưa đăng nhập!' };
    const prev = this.getNycConfig();
    const ge = {};
    if (cfg && cfg.farmsEnabled && typeof cfg.farmsEnabled === 'object') {
      Object.keys(cfg.farmsEnabled).forEach(k => { ge[k] = !!cfg.farmsEnabled[k]; });
    } else {
      Object.assign(ge, prev.farmsEnabled || {});
    }
    const byFarm = Object.assign({}, prev.byFarm || {});
    const slice = {
      animalId: (cfg && cfg.animalId) || null,
      seedKind: (cfg && (cfg.seedKind === 'myth' || cfg.seedKind === 'star')) ? cfg.seedKind : 'normal',
      mode: cfg && cfg.mode === 'count' ? 'count' : 'all',
      count: Math.max(1, Math.min(99, parseInt(cfg && cfg.count, 10) || 1))
    };
    const gIdx = cfg && (cfg.farmIndex !== undefined && cfg.farmIndex !== null)
      ? String(cfg.farmIndex) : null;
    if (gIdx !== null) {
      byFarm[gIdx] = slice;
      if (cfg && typeof cfg.farmEnabled === 'boolean') ge[gIdx] = cfg.farmEnabled;
    }
    const next = {
      ...slice,
      farmsEnabled: ge,
      byFarm,
      customName: (cfg && typeof cfg.customName === 'string') ? cfg.customName.trim().slice(0, 20) : (prev.customName || ''),
      gender: cfg && cfg.gender === 'male' ? 'male' : 'female'
    };
    currentPlayer.nycConfig = next;
    const label = gIdx !== null ? ('Trại ' + (Number(gIdx) + 1) + ' · ') : '';
    return { ok: true, msg: 'Đã lưu NYC · ' + label + (slice.animalId || 'chưa chọn giống') };
  },

  
  getPenSpeedMult(pen, atMs) {
    if (!pen) return 1;
    const t = (atMs != null && Number.isFinite(Number(atMs)))
      ? Number(atMs)
      : ((typeof nowMs === 'function' ? nowMs() : Date.now()));
    const perm = Number(pen.specialMultPermanent) || 0;
    const untilN = this.toMs(pen.specialMultUntil) || 0;
    const tempActive = untilN > t;
    let temp = 1;
    if (tempActive) {
      temp = Number(pen.specialMultTemp || pen.specialMult) || 1;
    }
    // specialMult luôn là sàn tốc độ (nâng vĩnh viễn / legacy / sau khi hết temp vẫn giữ)
    // Trước đây hết temp + có specialMultUntil cũ → rơi về x1 → offline mất vụ, realtime vẫn thu được
    const floor = Number(pen.specialMult) > 1 ? Number(pen.specialMult) : 1;
    // Permanent x50+ luôn được ưu tiên (tránh mất tốc độ offline)
    return Math.max(perm, temp, floor, 1);
  },

  getWeather() {
    if (this.raining && (typeof nowMs==="function"?nowMs():Date.now()) < this.rainUntil) {
      return { icon: '🌧️', text: 'Đang mưa!', mult: 1.25 };
    }
    const h = new Date().getHours();
    const weathers = [
      { icon: '☀️', text: 'Nắng đẹp', mult: 1.1 },
      { icon: '🌤️', text: 'Nắng nhẹ', mult: 1.05 },
      { icon: '⛅', text: 'Ít mây', mult: 1.0 },
      { icon: '🌦️', text: 'Có mưa rào', mult: 1.08 },
      { icon: '🌈', text: 'Sau mưa', mult: 1.12 }
    ];
    return weathers[h % weathers.length];
  },

  
  
  ensureNextRainAt() {
    const now = (typeof nowMs === 'function' ? nowMs() : Date.now());
    const interval = this.RAIN_INTERVAL_MS || (30 * 60 * 1000);
    let next = Number(this.nextRainAt) || 0;
    if (currentPlayer && currentPlayer.nextRainAt) {
      const pNext = Number(currentPlayer.nextRainAt) || 0;
      if (pNext > 0 && (next <= 0 || Math.abs(pNext - next) > 1000)) {
        // Ưu tiên lịch đã lưu trên player (đồng bộ phiên)
        next = pNext;
      }
    }
    // Chưa có lịch → hẹn 30 phút tới
    if (!next || next <= 0) {
      next = now + interval;
    }
    // Quá hạn quá xa (offline lâu) → mưa ngay (next = now), tryTrigger sẽ startRain
    // Không đẩy lại +30p kẻo bỏ lỡ trận mưa
    this.nextRainAt = next;
    if (currentPlayer) currentPlayer.nextRainAt = next;
    return next;
  },

  scheduleNextRain(fromMs) {
    const interval = this.RAIN_INTERVAL_MS || (30 * 60 * 1000);
    const base = (typeof fromMs === 'number' && fromMs > 0)
      ? fromMs
      : (typeof nowMs === 'function' ? nowMs() : Date.now());
    const next = base + interval;
    this.nextRainAt = next;
    if (currentPlayer) currentPlayer.nextRainAt = next;
    return next;
  },

  getRainRemainingSec() {
    const now = (typeof nowMs === 'function' ? nowMs() : Date.now());
    if (this.raining && this.rainUntil > now) {
      return Math.max(0, Math.ceil((this.rainUntil - now) / 1000));
    }
    const next = this.ensureNextRainAt();
    return Math.max(0, Math.ceil((next - now) / 1000));
  },

  tryTriggerRain() {
    if (this.raining && (typeof nowMs==="function"?nowMs():Date.now()) < this.rainUntil) return false;
    const now = (typeof nowMs === 'function' ? nowMs() : Date.now());
    const next = this.ensureNextRainAt();
    if (now >= next) {
      this.startRain();
      return true;
    }
    return false;
  },

  
  getRainDurationMs() {
    let mins = (currentSettings && currentSettings.rainDurationMinutes) != null
      ? Number(currentSettings.rainDurationMinutes)
      : 0.25;
    if (!Number.isFinite(mins) || mins <= 0) mins = 0.25;
    
    mins = Math.max(5 / 60, Math.min(120, mins));
    return Math.round(mins * 60 * 1000);
  },

  startRain() {
    this.raining = true;
    const durationMs = this.getRainDurationMs();
    const now = (typeof nowMs === 'function' ? nowMs() : Date.now());
    this.rainUntil = now + durationMs;
    // Chu kỳ 30 phút: trận mưa tiếp theo sau khi hết trận này (hoặc tối thiểu +30p từ lúc bắt đầu)
    this.scheduleNextRain(Math.max(this.rainUntil, now + (this.RAIN_INTERVAL_MS || 30 * 60 * 1000)));
    this.rainCollectCount = 0;
    let wateredN = 0;
    let autoCollectN = 0;
    let autoCoins = 0;
    let autoSeeds = 0;
    const fairyOn = this.isFairyActive();
    const fairyCollect = fairyOn && this.getFairyConfig().collectRain !== false;
    const fairyName = fairyOn
      ? ((this.getFairyDisplayName && this.getFairyDisplayName()) || 'Tiên')
      : '';
    const fairyEmoji = fairyOn
      ? ((this.getFairyEmoji && this.getFairyEmoji()) || '🧚')
      : '';

    if (currentPlayer) {
      this.ensureFarms();
      
      this.forEachFarm((pens, gi) => {
        if (!Array.isArray(pens)) return;
        const fairyHere = fairyOn && this.isFairyFarmEnabled(gi);
        pens.forEach((pen) => {
          if (!pen || !pen.animalId || !pen.raisedAt) return;
          if (!this.isReady(pen)) {
            const remain = this.getRemainingSeconds(pen);
            const cut = Math.floor(remain * 0.12);
            if (cut > 0) pen.raisedAt -= cut * 1000;
          }
          if (fairyHere) {
            pen.watered = true;
            pen.waterCount = 3;
            pen.lastWatered = now;
            wateredN++;
          }
        });
      });

      
      if (fairyCollect) {
        if (!currentPlayer.inventory) currentPlayer.inventory = { animals: {}, harvest: {}, feeds: {} };
        if (!currentPlayer.inventory.animals) currentPlayer.inventory.animals = {};
        const n = 3 + Math.floor(Math.random() * 4);
        for (let i = 0; i < n; i++) {
          if (Math.random() < 0.55) {
            const coins = 5 + Math.floor(Math.random() * 11);
            currentPlayer.coins = (currentPlayer.coins || 0) + coins;
            autoCoins += coins;
          } else {
            const animals = (this.getAnimals() || []).filter(p => p && p.id);
            if (animals.length) {
              const animal = animals[Math.floor(Math.random() * animals.length)];
              currentPlayer.inventory.animals[animal.id] = (currentPlayer.inventory.animals[animal.id] || 0) + 1;
              autoSeeds++;
            } else {
              const coins = 8;
              currentPlayer.coins = (currentPlayer.coins || 0) + coins;
              autoCoins += coins;
            }
          }
          autoCollectN++;
        }
        this.rainCollectCount = Math.min(8, (this.rainCollectCount || 0) + autoCollectN);
        currentPlayer.rainedCollectOnce = true;
      }
      
      let actMsg = fairyOn
        ? `Mưa · ${fairyEmoji} ${fairyName} chăm khi mưa: ${wateredN} ô`
        : `Mưa bắt đầu (${Math.round(durationMs / 1000)}s)`;
      if (autoCollectN > 0) {
        actMsg += ` · nhặt ${autoCollectN} vật phẩm`;
        if (autoCoins) actMsg += ` (+${autoCoins}🪙)`;
        if (autoSeeds) actMsg += ` (+${autoSeeds} con)`;
      }
      this.addActivity(actMsg, { type: fairyOn ? 'fairy_rain' : 'rain', at: now });
      if (fairyOn && wateredN > 0 && typeof Features !== 'undefined' && Features.trackQuest) {
        try { Features.trackQuest('water', wateredN * 3); } catch (_) {}
      }
      if (typeof savePlayer === 'function') savePlayer();
      if (typeof updateCoins === 'function') updateCoins();
      if (typeof renderFarm === 'function') {
        try { renderFarm(); } catch (_) {}
      }
      if (typeof renderActivityPage === 'function') {
        try { renderActivityPage(); } catch (_) {}
      }
    }
    if (typeof showRainEffect === 'function') showRainEffect();
    let tip = fairyOn
      ? `🌧️ Mưa + ${fairyEmoji} ${fairyName} chăm ${wateredN} ô!`
      : '🌧️ Mưa rồi! Chạm sâu / con rơi để nhặt thưởng!';
    if (autoCollectN > 0) tip += ` Nhặt ${autoCollectN} vật phẩm.`;
    if (typeof showToast === 'function') showToast(tip, 'success');
    setTimeout(() => {
      this.raining = false;
      if (typeof hideRainEffect === 'function') hideRainEffect();
    }, durationMs);
  },

  
  async collectRainItem(kind) {
    if (!currentPlayer) return { ok: false, msg: 'Chưa đăng nhập!' };
    if (!this.raining || (typeof nowMs==="function"?nowMs():Date.now()) >= this.rainUntil) {
      return { ok: false, msg: 'Mưa đã tạnh!' };
    }
    this.rainCollectCount = (this.rainCollectCount || 0) + 1;
    if (this.rainCollectCount > 8) {
      return { ok: false, msg: 'Đã nhặt hết trong trận mưa này!' };
    }
    currentPlayer.rainedCollectOnce = true;
    let msg = '';
    if (kind === 'bug') {
      const coins = 5 + Math.floor(Math.random() * 11); 
      currentPlayer.coins = (currentPlayer.coins || 0) + coins;
      this.addActivity(`Bắt sâu khi mưa +${coins}🪙`);
      msg = `🐛 +${coins}🪙`;
    } else {
      const animals = (this.getAnimals() || []).filter(p => p && p.id);
      if (!animals.length) {
        const coins = 8;
        currentPlayer.coins = (currentPlayer.coins || 0) + coins;
        msg = `✨ +${coins}🪙`;
      } else {
        const animal = animals[Math.floor(Math.random() * animals.length)];
        if (!currentPlayer.inventory) currentPlayer.inventory = { animals: {}, harvest: {}, feeds: {} };
        if (!currentPlayer.inventory.animals) currentPlayer.inventory.animals = {};
        currentPlayer.inventory.animals[animal.id] = (currentPlayer.inventory.animals[animal.id] || 0) + 1;
        this.addActivity(`Nhặt con rơi: ${animal.name}`);
        msg = `🌱 +1 ${animal.name}`;
      }
    }
    const ach = this.checkAchievements();
    await savePlayer();
    this.notifyAchievements(ach);
    if (typeof updateCoins === 'function') updateCoins();
    return { ok: true, msg };
  },

  
  async publishPublicFarm() {
    if (!currentUser || !currentPlayer) return;
    try {
      const pens = (Array.isArray(currentPlayer.pens) ? currentPlayer.pens : Object.values(currentPlayer.pens || {}))
        .map((p, i) => ({
          id: i,
          animalId: p.animalId || null,
          raisedAt: p.raisedAt || null,
          waterCount: p.waterCount || 0,
          lastWatered: p.lastWatered || null,
          feedId: p.feedId || null,
          feedAt: p.feedAt || null
        }));
      await db.ref('publicFarms/' + currentUser.uid).set({
        uid: currentUser.uid,
        name: currentPlayer.displayName || (currentPlayer.email || currentUser.email || 'Player').split('@')[0],
        level: currentPlayer.level || 1,
        penCount: pens.length,
        pens,
        updatedAt: (typeof nowMs==="function"?nowMs():Date.now())
      });
    } catch (e) {
      console.warn('publicFarm', e);
    }
  },

  



  async helpCareFriend(friendUid) {
    if (!currentUser || !currentPlayer) return { ok: false, msg: 'Chưa đăng nhập!' };
    if (!friendUid || friendUid === currentUser.uid) return { ok: false, msg: 'Không hợp lệ!' };
    const today = (typeof gameDateString === 'function') ? gameDateString() : new Date().toDateString();
    if (!currentPlayer.helpCareLog) currentPlayer.helpCareLog = {};
    if (currentPlayer.helpCareLog[friendUid] === today) {
      return { ok: false, msg: 'Hôm nay bạn đã chăm giúp người này rồi!' };
    }
    try {
      await db.ref('farmHelps/' + friendUid + '/' + currentUser.uid).set({
        from: currentUser.uid,
        fromName: currentPlayer.displayName || (currentPlayer.email || '').split('@')[0] || 'Bạn',
        at: (typeof nowMs==="function"?nowMs():Date.now()),
        day: today
      });
    } catch (e) {
      return { ok: false, msg: 'Lỗi gửi chăm giúp (cập nhật Firebase Rules?). ' + (e.message || '') };
    }
    currentPlayer.helpCareLog[friendUid] = today;
    currentPlayer.helpedFriendOnce = true;
    const coins = 12;
    const xp = 3;
    currentPlayer.coins = (currentPlayer.coins || 0) + coins;
    this.addXp(xp);
    this.addActivity(`Chăm giúp bạn +${coins}🪙 +${xp} XP`);
    const ach = this.checkAchievements();
    await savePlayer();
    this.notifyAchievements(ach);
    if (typeof updateCoins === 'function') updateCoins();
    return { ok: true, msg: `Đã chăm giúp! +${coins}🪙 +${xp} XP` };
  },

  
  async applyPendingHelps() {
    if (!currentUser || !currentPlayer || !currentPlayer.pens) return;
    try {
      const snap = await db.ref('farmHelps/' + currentUser.uid).once('value');
      const helps = snap.val();
      if (!helps) return;
      let applied = 0;
      const names = [];
      for (const fromUid of Object.keys(helps)) {
        const h = helps[fromUid];
        
        const pen = currentPlayer.pens.find(p =>
          p && p.animalId && !this.isReady(p) && (p.waterCount || 0) < 3
        );
        if (pen) {
          pen.waterCount = (pen.waterCount || 0) + 1;
          pen.watered = true;
          pen.lastWatered = (typeof nowMs==="function"?nowMs():Date.now());
          applied++;
          if (h.fromName) names.push(h.fromName);
        }
        await db.ref('farmHelps/' + currentUser.uid + '/' + fromUid).remove();
      }
      if (applied > 0) {
        this.addActivity(`Nhận ${applied} lượt chăm giúp` + (names.length ? ` từ ${names.slice(0, 3).join(', ')}` : ''));
        if (typeof showToast === 'function') {
          showToast(`💧 Bạn bè đã chăm giúp ${applied} ô!`, 'success');
        }
      }
    } catch (e) {
      console.warn('applyPendingHelps', e);
    }
  },

  getEffectiveRaiseTime(pen, atMs) {
    if (!pen || !pen.animalId) return 9999;
    const animal = this.getAnimal(pen.animalId);
    // Fallback: dùng baseRaiseTime lưu trên ô (tránh offline 0 vụ khi định nghĩa động vật custom chưa load / lệch id)
    let t = (animal && Number(animal.raiseTime) > 0)
      ? Number(animal.raiseTime)
      : (Number(pen.baseRaiseTime) > 0 ? Number(pen.baseRaiseTime) : 0);
    if (!(t > 0)) {
      // Con custom mất định nghĩa — không trả 9999 (sẽ làm offline luôn 0 vụ)
      // Dùng 600s mặc định an toàn thay vì bỏ sót hoàn toàn
      t = 600;
    }

    const waterBonus = Math.min(pen.waterCount || 0, 3) * 0.12;
    t *= (1 - waterBonus);

    if (pen.feedId) {
      const fert = this.getFeed(pen.feedId);
      if (fert) t *= (1 - (fert.timeReduce || 0));
    }

    const weather = this.getWeather();
    if (weather && weather.mult > 0) t /= weather.mult;

    const sm = this.getPenSpeedMult(pen, atMs);
    if (sm > 1) t /= sm;

    return Math.max(20, t);
  },

  
  getStageThresholds(pen) {
    const animal = this.getAnimal(pen.animalId);
    const effective = this.getEffectiveRaiseTime(pen);
    if (animal && Array.isArray(animal.raiseStages) && animal.raiseStages.length >= 4) {
      const baseTotal = animal.raiseStages[3] || animal.raiseTime || effective;
      const ratio = effective / baseTotal;
      return animal.raiseStages.map(t => Math.max(1, t * ratio));
    }
    
    const total = effective;
    const t1 = Math.max(60, total * 0.25);
    const t2 = Math.max(t1 + 60, total * 0.50);
    const t3 = Math.max(t2 + 60, total * 0.75);
    const t4 = total;
    return [t1, t2, t3, t4];
  },

  getElapsedEffective(pen) {
    if (!pen || !pen.animalId || !pen.raisedAt) return 0;
    const raisedAt = this.toMs(pen.raisedAt);
    if (!Number.isFinite(raisedAt) || raisedAt <= 0) return 0;
    return Math.max(0, ((typeof nowMs === 'function' ? nowMs() : Date.now()) - raisedAt) / 1000);
  },

  getProgress(pen) {
    if (!pen || !pen.animalId || !pen.raisedAt) return 0;
    const elapsed = this.getElapsedEffective(pen);
    const total = this.getEffectiveRaiseTime(pen);
    return Math.min(100, Math.floor((elapsed / total) * 100));
  },

  getRemainingSeconds(pen) {
    if (!pen || !pen.animalId || !pen.raisedAt) return 0;
    const elapsed = this.getElapsedEffective(pen);
    const total = this.getEffectiveRaiseTime(pen);
    return Math.max(0, Math.ceil(total - elapsed));
  },

  formatTime(sec) {
    const n = Math.max(0, Math.floor(Number(sec) || 0));
    const h = Math.floor(n / 3600);
    const m = Math.floor((n % 3600) / 60);
    const s = n % 60;
    const pad2 = (x) => String(x).padStart(2, '0');
    
    if (h > 0) return `${h}h ${pad2(m)}m ${pad2(s)}s`;
    if (m > 0) return `${pad2(m)}m ${pad2(s)}s`;
    return `${pad2(s)}s`;
  },

  getStage(pen) {
    if (!pen || !pen.animalId) {
      return { key: 'empty', icon: '🟫', label: 'Trống', idx: -1 };
    }
    const animal = this.getAnimal(pen.animalId);
    const elapsed = this.getElapsedEffective(pen);
    const [t1, t2, t3, t4] = this.getStageThresholds(pen);
    const ready = elapsed >= t4;

    if (ready) {
      return { key: 'ready', icon: animal ? animal.icon : '✨', label: 'Sẵn sàng', idx: 4 };
    }
    if (elapsed >= t3) {
      return { key: 'almost', icon: '🌾', label: 'Sắp chín', idx: 3 };
    }
    if (elapsed >= t2) {
      return { key: 'growing', icon: '🌿', label: 'Đang lớn', idx: 2 };
    }
    if (elapsed >= t1) {
      return { key: 'young', icon: '🥚', label: 'Con non', idx: 1 };
    }
    return { key: 'newborn', icon: '🐣', label: 'Động vật', idx: 0 };
  },

  isReady(pen) {
    if (!pen || !pen.animalId || !pen.raisedAt) return false;
    const raisedAt = Number(pen.raisedAt);
    if (!Number.isFinite(raisedAt) || raisedAt <= 0) return false;
    const elapsed = Math.max(0, ((typeof nowMs === 'function' ? nowMs() : Date.now()) - raisedAt) / 1000);
    return elapsed + 0.05 >= this.getEffectiveRaiseTime(pen);
  },

  xpForLevel(level) { return level * 50; },

  addXp(amount) {
    if (!currentPlayer) return;
    const MAX_LV = 10000;
    if ((currentPlayer.level || 1) >= MAX_LV) {
      currentPlayer.level = MAX_LV;
      return;
    }
    currentPlayer.xp = (currentPlayer.xp || 0) + amount;
    while (currentPlayer.xp >= this.xpForLevel(currentPlayer.level || 1) && (currentPlayer.level || 1) < MAX_LV) {
      currentPlayer.xp -= this.xpForLevel(currentPlayer.level || 1);
      currentPlayer.level = (currentPlayer.level || 1) + 1;
      currentPlayer.coins += 100 * currentPlayer.level;
      this.addActivity(`Lên cấp ${currentPlayer.level}! +${100 * currentPlayer.level}🪙`);
    }
  },

  
  isAnimalLimited(animal) {
    if (!animal) return false;
    if (animal.limited) return true;
    if (Array.isArray(animal.availableMonths) && animal.availableMonths.length) return true;
    if (animal.availableFrom || animal.availableTo) return true;
    return false;
  },

  isAnimalAvailable(animal) {
    if (!animal) return false;
    if (!this.isAnimalLimited(animal)) return true;
    const now = (typeof nowMs==="function"?nowMs():Date.now());
    if (animal.availableFrom && now < Number(animal.availableFrom)) return false;
    if (animal.availableTo && now > Number(animal.availableTo)) return false;
    const months = animal.availableMonths;
    if (months && months.length) {
      const m = new Date().getMonth() + 1;
      return months.includes(Number(m));
    }
    return true;
  },

  getLimitedEventLabel(animal) {
    if (!this.isAnimalLimited(animal)) return '';
    if (animal.availableTo) {
      const left = Math.max(0, Number(animal.availableTo) - (typeof nowMs==="function"?nowMs():Date.now()));
      if (left <= 0) return 'Hết sự kiện';
      return 'Còn ' + this.formatTime(Math.ceil(left / 1000));
    }
    const months = animal.availableMonths;
    if (months && months.length) return 'Tháng ' + months.join(', ');
    return 'Limited';
  },

  unlockCollection(animalId) {
    if (!currentPlayer || !animalId) return;
    if (!currentPlayer.collection) currentPlayer.collection = {};
    if (!currentPlayer.collection[animalId]) {
      currentPlayer.collection[animalId] = { at: (typeof nowMs==="function"?nowMs():Date.now()) };
      return true;
    }
    return false;
  },

  collectionCount() {
    if (!currentPlayer || !currentPlayer.collection) return 0;
    return Object.keys(currentPlayer.collection).length;
  },

  collectionPercent() {
    const total = (this.getAnimals() || []).length || 1;
    return Math.min(100, Math.round((this.collectionCount() / total) * 100));
  },

  getAchievementsDef() {
    return [
      { id: 'first_raise', name: 'Người chăn nuôi', desc: 'Nuôi động vật lần đầu', icon: '🥚', check: p => (p.stats && p.stats.raised) >= 1, reward: { coins: 30, xp: 5 } },
      { id: 'first_harvest', name: 'Mùa màng đầu', desc: 'Thu hoạch lần đầu', icon: '🧺', check: p => (p.stats && p.stats.harvested) >= 1, reward: { coins: 50, xp: 8 } },
      { id: 'harvest_50', name: 'Nông dân chăm chỉ', desc: 'Thu hoạch tổng 50 sản phẩm', icon: '🌾', check: p => (p.stats && p.stats.harvested) >= 50, reward: { coins: 120, xp: 15 } },
      { id: 'harvest_200', name: 'Đại gia sản phẩm', desc: 'Thu hoạch tổng 200 sản phẩm', icon: '🏆', check: p => (p.stats && p.stats.harvested) >= 200, reward: { coins: 400, xp: 40 } },
      { id: 'full_farm', name: 'Trại ken đặc', desc: 'Có ít nhất 12 ô đang nuôi', icon: '🌳', check: p => (p.pens || []).filter(x => x && x.animalId).length >= 12, reward: { coins: 100, xp: 12 } },
      { id: 'level_5', name: 'Tài năng trại', desc: 'Đạt cấp 5', icon: '⭐', check: p => (p.level || 1) >= 5, reward: { coins: 150, xp: 0 } },
      { id: 'level_10', name: 'Bậc thầy trại', desc: 'Đạt cấp 10', icon: '🌟', check: p => (p.level || 1) >= 10, reward: { coins: 400, xp: 0 } },
      { id: 'collect_10', name: 'Sưu tầm viên', desc: 'Mở khóa 10 loại trong album', icon: '📖', check: p => Object.keys(p.collection || {}).length >= 10, reward: { coins: 80, xp: 10 } },
      { id: 'collect_50', name: 'Nhà sưu tầm', desc: 'Mở khóa 50 loại trong album', icon: '📚', check: p => Object.keys(p.collection || {}).length >= 50, reward: { coins: 300, xp: 30 } },
      { id: 'collect_100', name: 'Bách khoa thực vật', desc: 'Mở khóa 100 loại', icon: '🏅', check: p => Object.keys(p.collection || {}).length >= 100, reward: { coins: 800, xp: 80 } },
      { id: 'chat_streak_3', name: 'Bạn thân', desc: 'Chat streak 3 ngày với một người', icon: '💬', check: p => (p.maxChatStreak || 0) >= 3, reward: { coins: 60, xp: 8 } },
      { id: 'chat_streak_7', name: 'Gắn bó tuần', desc: 'Chat streak 7 ngày', icon: '🔥', check: p => (p.maxChatStreak || 0) >= 7, reward: { coins: 200, xp: 20 } },
      { id: 'help_friend', name: 'Hàng xóm tốt', desc: 'Chăm giúp bạn bè 1 lần', icon: '💧', check: p => !!p.helpedFriendOnce, reward: { coins: 40, xp: 5 } },
      { id: 'rain_play', name: 'Đùa với mưa', desc: 'Nhặt vật phẩm khi mưa', icon: '🌧️', check: p => !!p.rainedCollectOnce, reward: { coins: 40, xp: 5 } },
      { id: 'rich_5k', name: 'Túi tiền đầy', desc: 'Sở hữu ít nhất 5000 coin', icon: '💰', check: p => (p.coins || 0) >= 5000, reward: { coins: 100, xp: 10 } }
    ];
  },

  checkAchievements() {
    if (!currentPlayer) return [];
    if (!currentPlayer.achievements) currentPlayer.achievements = {};
    const unlocked = [];
    this.getAchievementsDef().forEach(a => {
      if (currentPlayer.achievements[a.id]) return;
      try {
        if (a.check(currentPlayer)) {
          currentPlayer.achievements[a.id] = (typeof nowMs==="function"?nowMs():Date.now());
          const coins = (a.reward && a.reward.coins) || 0;
          const xp = (a.reward && a.reward.xp) || 0;
          if (coins) currentPlayer.coins = (currentPlayer.coins || 0) + coins;
          if (xp) this.addXp(xp);
          this.addActivity(`🏅 Thành tựu: ${a.name}` + (coins ? ` +${coins}🪙` : ''));
          unlocked.push(a);
        }
      } catch (_) {}
    });
    return unlocked;
  },

  notifyAchievements(list) {
    if (!list || !list.length) return;
    if (typeof showToast === 'function') {
      list.forEach(a => showToast(`🏅 ${a.name}: ${a.desc}`, 'success'));
    }
  },

  // 0 = không giới hạn số lượng / lần (chỉ giới hạn bởi số xu)
  BUY_MAX_QTY: 0,

  // Chặn double-tap / ghost click làm mua 2 lần
  _buyLock: false,

  async buySeed(animalId, qty = 1) {
    if (!currentPlayer) return { ok: false, msg: 'Chưa đăng nhập!' };
    if (this._buyLock) return { ok: false, msg: 'Đang xử lý mua hàng…' };
    const animal = this.getAnimal(animalId);
    if (!animal) return { ok: false, msg: 'Không tìm thấy động vật!' };
    if (!this.isAnimalAvailable(animal)) {
      return { ok: false, msg: 'Con Limited — ngoài thời gian sự kiện!' };
    }
    const price = Math.max(0, Number(animal.buyPrice) || 0);
    if (qty === 'all' || qty === 'max') {
      qty = price > 0 ? Math.floor((Number(currentPlayer.coins) || 0) / price) : 1;
    } else {
      qty = Math.max(1, Math.floor(Number(qty) || 1));
    }
    if (!Number.isFinite(qty) || qty < 1) qty = 1;
    const buyMax = this.BUY_MAX_QTY || 0;
    if (buyMax > 0 && qty > buyMax) qty = buyMax;
    // Không vượt quá số xu hiện có
    if (price > 0 && !this.isUnlimitedResources()) {
      const maxAfford = Math.floor((Number(currentPlayer.coins) || 0) / price);
      if (maxAfford < 1) return { ok: false, msg: 'Không đủ tiền!' };
      if (qty > maxAfford) qty = maxAfford;
    }
    const cost = price * qty;
    this._buyLock = true;
    try {
      if (!this.chargeCoins(cost)) return { ok: false, msg: 'Không đủ tiền!' };
      if (!currentPlayer.inventory.animals) currentPlayer.inventory.animals = {};
      currentPlayer.inventory.animals[animalId] = (currentPlayer.inventory.animals[animalId] || 0) + qty;
      this.addActivity(this.isUnlimitedResources()
        ? `Mua ${qty} con ${animal.name} (unlimited)`
        : `Mua ${qty} con ${animal.name} (-${cost.toLocaleString()}🪙)`);
      if (typeof Features !== 'undefined') Features.trackQuest('buySeed', qty);
      await savePlayer();
      return { ok: true, msg: `Đã mua ${qty.toLocaleString()} con ${animal.name}!` };
    } finally {
      this._buyLock = false;
    }
  },

  async buyFeed(fertId, qty = 1) {
    if (!currentPlayer) return { ok: false, msg: 'Chưa đăng nhập!' };
    if (this._buyLock) return { ok: false, msg: 'Đang xử lý mua hàng…' };
    const fert = this.getFeed(fertId);
    if (!fert) return { ok: false, msg: 'Không tìm thấy cám bón!' };
    const price = Math.max(0, Number(fert.price) || 0);
    if (qty === 'all' || qty === 'max') {
      qty = price > 0 ? Math.floor((Number(currentPlayer.coins) || 0) / price) : 1;
    } else {
      qty = Math.max(1, Math.floor(Number(qty) || 1));
    }
    if (!Number.isFinite(qty) || qty < 1) qty = 1;
    const buyMax = this.BUY_MAX_QTY || 0;
    if (buyMax > 0 && qty > buyMax) qty = buyMax;
    if (price > 0 && !this.isUnlimitedResources()) {
      const maxAfford = Math.floor((Number(currentPlayer.coins) || 0) / price);
      if (maxAfford < 1) return { ok: false, msg: 'Không đủ tiền!' };
      if (qty > maxAfford) qty = maxAfford;
    }
    const cost = price * qty;
    this._buyLock = true;
    try {
      if (!this.chargeCoins(cost)) return { ok: false, msg: 'Không đủ tiền!' };
      if (!currentPlayer.inventory.feeds) currentPlayer.inventory.feeds = {};
      currentPlayer.inventory.feeds[fertId] = (currentPlayer.inventory.feeds[fertId] || 0) + qty;
      this.addActivity(this.isUnlimitedResources()
        ? `Mua ${qty} ${fert.name} (unlimited)`
        : `Mua ${qty} ${fert.name} (-${cost.toLocaleString()}🪙)`);
      await savePlayer();
      return { ok: true, msg: `Đã mua ${qty.toLocaleString()} ${fert.name}!` };
    } finally {
      this._buyLock = false;
    }
  },

  async raiseAnimal(plotId, animalId, preferredKind) {
    if (!currentPlayer) return { ok: false, msg: 'Chưa đăng nhập!' };
    const pen = currentPlayer.pens[plotId];
    if (!pen) return { ok: false, msg: 'Chuồng không tồn tại!' };
    if (pen.animalId) return { ok: false, msg: 'Chuồng đã có con!' };
    const unlimited = this.isUnlimitedResources();
    if (!currentPlayer.inventory.animalsMyth) currentPlayer.inventory.animalsMyth = {};
    const normal = (currentPlayer.inventory.animals && currentPlayer.inventory.animals[animalId]) || 0;
    const star = (currentPlayer.inventory.animalsStar && currentPlayer.inventory.animalsStar[animalId]) || 0;
    const myth = (currentPlayer.inventory.animalsMyth && currentPlayer.inventory.animalsMyth[animalId]) || 0;
    let usedStar = false;
    let usedMyth = false;
    if (preferredKind === 'myth') {
      if (!unlimited && myth < 1) return { ok: false, msg: 'Không đủ con huyền thoại!' };
      usedMyth = true;
      usedStar = true;
      if (!unlimited) {
        currentPlayer.inventory.animalsMyth[animalId]--;
        if (currentPlayer.inventory.animalsMyth[animalId] <= 0) delete currentPlayer.inventory.animalsMyth[animalId];
      }
    } else if (preferredKind === 'star') {
      if (!unlimited && star < 1) return { ok: false, msg: 'Không đủ con sao!' };
      usedStar = true;
      if (!unlimited) {
        currentPlayer.inventory.animalsStar[animalId]--;
        if (currentPlayer.inventory.animalsStar[animalId] <= 0) delete currentPlayer.inventory.animalsStar[animalId];
      }
    } else if (preferredKind === 'normal') {
      if (!unlimited && normal < 1) return { ok: false, msg: 'Không đủ con thường!' };
      if (!unlimited) {
        currentPlayer.inventory.animals[animalId]--;
        if (currentPlayer.inventory.animals[animalId] <= 0) delete currentPlayer.inventory.animals[animalId];
      }
    } else {
      if (!unlimited && normal + star < 1) return { ok: false, msg: 'Không đủ động vật!' };
      if (star > 0 || (unlimited && preferredKind !== 'normal')) {
        usedStar = star > 0;
        if (unlimited && star < 1 && preferredKind === 'star') usedStar = true;
        if (!unlimited && star > 0) {
          currentPlayer.inventory.animalsStar[animalId]--;
          if (currentPlayer.inventory.animalsStar[animalId] <= 0) delete currentPlayer.inventory.animalsStar[animalId];
          usedStar = true;
        } else if (!unlimited) {
          currentPlayer.inventory.animals[animalId]--;
          if (currentPlayer.inventory.animals[animalId] <= 0) delete currentPlayer.inventory.animals[animalId];
        } else if (star > 0) {
          usedStar = true;
        }
      }
    }
    pen.animalId = animalId;
    pen.raisedAt = (typeof nowMs==="function"?nowMs():Date.now());
    pen.watered = false;
    pen.waterCount = 0;
    pen.lastWatered = null;
    pen.feedId = null;
    pen.feedAt = null;
    pen.animalStar = usedStar || usedMyth;
    pen.seedMyth = usedMyth;
    {
      const anDef = this.getAnimal(animalId);
      pen.baseRaiseTime = (anDef && Number(anDef.raiseTime) > 0) ? Number(anDef.raiseTime) : (Number(pen.baseRaiseTime) || 0);
    }
    
    let fairyCareed = false;
    if (this.isFairyActive() && (pen.waterCount || 0) < 3) {
      pen.waterCount = 3;
      pen.watered = true;
      pen.lastWatered = (typeof nowMs==="function"?nowMs():Date.now());
      fairyCareed = true;
      if (typeof Features !== 'undefined' && Features.trackQuest) Features.trackQuest('water', 3);
    }
    currentPlayer.stats.raised = (currentPlayer.stats.raised || 0) + 1;
    const animal = this.getAnimal(animalId);
    const _pTag = usedMyth ? '✨ ' : (usedStar ? '⭐ ' : '');
    this.addActivity(`Nuôi ${_pTag}${animal.name} vào chuồng #${plotId + 1}` + (fairyCareed ? ' · Tiên chăm ngay' : ''));
    if (typeof Features !== 'undefined') Features.trackQuest('animal', 1);
    if (typeof recordGameEvent === 'function') {
      recordGameEvent('animal', {
        penId,
        farmIndex: currentPlayer.activeFarm || 0,
        animalId,
        raisedAt: pen.raisedAt,
        seedKind: usedMyth ? 'myth' : (usedStar ? 'star' : 'normal'),
        watered: pen.watered,
        waterCount: pen.waterCount || 0
      });
    }
    const ach = this.checkAchievements();
    await savePlayer({ action: 'animal' });
    this.notifyAchievements(ach);
    return { ok: true, msg: `Đã nuôi ${usedMyth ? '✨ ' : (usedStar ? '⭐ ' : '')}${animal.name}!` + (fairyCareed ? ' 🧚 Tiên đã chăm.' : '') };
  },

  
  async raiseMultiple(animalId, count, preferredKind, sharedAt) {
    if (!currentPlayer) return { ok: false, msg: 'Chưa đăng nhập!' };
    const animal = this.getAnimal(animalId);
    if (!animal) return { ok: false, msg: 'Con không hợp lệ!' };
    const empty = [];
    currentPlayer.pens.forEach((p, i) => { if (!p.animalId) empty.push(i); });
    if (empty.length === 0) return { ok: false, msg: 'Không còn chuồng trống!' };
    if (!currentPlayer.inventory.animalsMyth) currentPlayer.inventory.animalsMyth = {};
    const normal = (currentPlayer.inventory.animals && currentPlayer.inventory.animals[animalId]) || 0;
    const star = (currentPlayer.inventory.animalsStar && currentPlayer.inventory.animalsStar[animalId]) || 0;
    const myth = (currentPlayer.inventory.animalsMyth && currentPlayer.inventory.animalsMyth[animalId]) || 0;
    let seedCount = normal + star + myth;
    if (preferredKind === 'myth') seedCount = myth;
    else if (preferredKind === 'star') seedCount = star;
    else if (preferredKind === 'normal') seedCount = normal;
    if (seedCount < 1) {
      return { ok: false, msg: preferredKind === 'myth' ? 'Không đủ con huyền thoại!' : (preferredKind === 'star' ? 'Không đủ con sao!' : (preferredKind === 'normal' ? 'Không đủ con thường!' : 'Không đủ động vật!')) };
    }
    const n = Math.min(count, empty.length, seedCount);
    const at = typeof sharedAt === 'number' ? sharedAt : (typeof nowMs==="function"?nowMs():Date.now());
    const fairyOn = this.isFairyActive();
    let raisedCount = 0;
    let fairyCareedN = 0;
    for (let i = 0; i < n; i++) {
      const penId = empty[i];
      const pen = currentPlayer.pens[penId];
      if (!pen || pen.animalId) break;
      let usedStar = false;
      let usedMyth = false;
      if (preferredKind === 'myth') {
        if (!this.isUnlimitedResources() && (currentPlayer.inventory.animalsMyth[animalId] || 0) < 1) break;
        if (!this.isUnlimitedResources()) {
          currentPlayer.inventory.animalsMyth[animalId]--;
          if (currentPlayer.inventory.animalsMyth[animalId] <= 0) delete currentPlayer.inventory.animalsMyth[animalId];
        }
        usedMyth = true;
        usedStar = true;
      } else if (preferredKind === 'star') {
        if ((currentPlayer.inventory.animalsStar[animalId] || 0) < 1) break;
        currentPlayer.inventory.animalsStar[animalId]--;
        if (currentPlayer.inventory.animalsStar[animalId] <= 0) delete currentPlayer.inventory.animalsStar[animalId];
        usedStar = true;
      } else if (preferredKind === 'normal') {
        if ((currentPlayer.inventory.animals[animalId] || 0) < 1) break;
        currentPlayer.inventory.animals[animalId]--;
        if (currentPlayer.inventory.animals[animalId] <= 0) delete currentPlayer.inventory.animals[animalId];
      } else {
        const my = (currentPlayer.inventory.animalsMyth && currentPlayer.inventory.animalsMyth[animalId]) || 0;
        const st = (currentPlayer.inventory.animalsStar && currentPlayer.inventory.animalsStar[animalId]) || 0;
        const nm = (currentPlayer.inventory.animals && currentPlayer.inventory.animals[animalId]) || 0;
        if (my + st + nm < 1) break;
        if (my > 0) {
          currentPlayer.inventory.animalsMyth[animalId]--;
          if (currentPlayer.inventory.animalsMyth[animalId] <= 0) delete currentPlayer.inventory.animalsMyth[animalId];
          usedMyth = true;
          usedStar = true;
        } else if (st > 0) {
          currentPlayer.inventory.animalsStar[animalId]--;
          if (currentPlayer.inventory.animalsStar[animalId] <= 0) delete currentPlayer.inventory.animalsStar[animalId];
          usedStar = true;
        } else {
          currentPlayer.inventory.animals[animalId]--;
          if (currentPlayer.inventory.animals[animalId] <= 0) delete currentPlayer.inventory.animals[animalId];
        }
      }
      pen.animalId = animalId;
      pen.raisedAt = at; 
      pen.watered = false;
      pen.waterCount = 0;
      pen.lastWatered = null;
      pen.feedId = null;
      pen.feedAt = null;
      pen.animalStar = usedStar || usedMyth;
      pen.seedMyth = usedMyth;
      {
        const anDef = this.getAnimal(animalId);
        pen.baseRaiseTime = (anDef && Number(anDef.raiseTime) > 0) ? Number(anDef.raiseTime) : (Number(pen.baseRaiseTime) || 0);
      }
      if (fairyOn) {
        pen.waterCount = 3;
        pen.watered = true;
        pen.lastWatered = at;
        fairyCareedN++;
      }
      raisedCount++;
      currentPlayer.stats.raised = (currentPlayer.stats.raised || 0) + 1;
    }
    if (raisedCount > 0) {
      if (typeof Features !== 'undefined' && Features.trackQuest) {
        Features.trackQuest('animal', raisedCount);
        if (fairyCareedN > 0) Features.trackQuest('water', fairyCareedN * 3);
      }
      this.addActivity(`Nuôi ${raisedCount} chuồng ${animal.name}` + (fairyCareedN ? ` · Tiên chăm ${fairyCareedN} ô` : '') + ' (đồng bộ giờ)');
      const ach = this.checkAchievements();
      await savePlayer();
      this.notifyAchievements(ach);
    }
    return { ok: raisedCount > 0, msg: raisedCount > 0 ? `Đã nuôi ${raisedCount} chuồng (cùng giờ)!` : 'Không nuôi được.' };
  },

  async waterPen(plotId) {
    if (!currentPlayer) return { ok: false, msg: 'Chưa đăng nhập!' };
    const pen = currentPlayer.pens[plotId];
    if (!pen || !pen.animalId) return { ok: false, msg: 'Không có con để chăm!' };
    if (this.isReady(pen)) return { ok: false, msg: 'Đã sẵn sàng thu hoạch!' };
    const count = pen.waterCount || 0;
    if (count >= 3) return { ok: false, msg: 'Đã chăm tối đa 3 lần!' };
    
    pen.watered = true;
    pen.waterCount = count + 1;
    pen.lastWatered = (typeof nowMs==="function"?nowMs():Date.now());
    this.addActivity(`Chăm sóc chuồng #${plotId + 1} (${pen.waterCount}/3)`);
    if (typeof Features !== 'undefined') Features.trackQuest('water', 1);
    if (typeof recordGameEvent === 'function') {
      recordGameEvent('water', {
        penId,
        farmIndex: currentPlayer.activeFarm || 0,
        animalId: pen.animalId,
        waterCount: pen.waterCount,
        at: pen.lastWatered
      });
    }
    await savePlayer({ action: 'water' });
    this.checkAchievements();
    return { ok: true, msg: `Đã tưới! (${pen.waterCount}/3)` };
  },

  async applyFeed(plotId, fertId) {
    if (!currentPlayer) return { ok: false, msg: 'Chưa đăng nhập!' };
    const pen = currentPlayer.pens[plotId];
    if (!pen || !pen.animalId) return { ok: false, msg: 'Không có con!' };
    if (this.isReady(pen)) return { ok: false, msg: 'Đã sẵn sàng thu hoạch!' };
    if (this.isFertBoostActive(pen)) return { ok: false, msg: 'Ô này đang còn hiệu lực cám!' };
    // Hết hiệu lực → cho phép bón lại
    if (pen.feedId) { pen.feedId = null; pen.feedAt = null; }
    const have = (currentPlayer.inventory.feeds && currentPlayer.inventory.feeds[fertId]) || 0;
    if (have < 1) return { ok: false, msg: 'Không đủ cám bón!' };
    const fert = this.getFeed(fertId);
    if (!fert) return { ok: false, msg: 'Thức ăn không hợp lệ!' };
    currentPlayer.inventory.feeds[fertId]--;
    if (currentPlayer.inventory.feeds[fertId] <= 0) delete currentPlayer.inventory.feeds[fertId];
    pen.feedId = fertId;
    pen.feedAt = (typeof nowMs==="function"?nowMs():Date.now());
    this.addActivity(`Cho ăn ${fert.name} chuồng #${plotId + 1}`);
    if (typeof recordGameEvent === 'function') {
      recordGameEvent('fert', {
        penId,
        farmIndex: currentPlayer.activeFarm || 0,
        animalId: pen.animalId,
        fertId,
        at: pen.feedAt
      });
    }
    await savePlayer({ action: 'fert' });
    return { ok: true, msg: `Đã cho ăn ${fert.name}!` };
  },

  async waterAll(limit) {
    if (!currentPlayer) return { ok: false, msg: 'Chưa đăng nhập!' };
    const maxPens = (limit == null || limit === 'all') ? Infinity : Math.max(0, parseInt(limit, 10) || 0);
    let pensDone = 0;
    let actions = 0;
    for (const pen of currentPlayer.pens) {
      if (pensDone >= maxPens) break;
      if (pen.animalId && !this.isReady(pen) && (pen.waterCount || 0) < 3) {
        
        while ((pen.waterCount || 0) < 3) {
          pen.watered = true;
          pen.waterCount = (pen.waterCount || 0) + 1;
          pen.lastWatered = (typeof nowMs==="function"?nowMs():Date.now());
          actions++;
        }
        pensDone++;
      }
    }
    if (actions > 0) {
      this.addActivity(`Chăm đủ ${pensDone} ô (${actions} lần)`);
      if (typeof Features !== 'undefined' && Features.trackQuest) Features.trackQuest('water', actions);
      await savePlayer();
      this.checkAchievements();
    }
    return { ok: true, msg: actions > 0 ? `Đã chăm đủ 3 lần cho ${pensDone} ô!` : 'Không có ô nào cần tưới.' };
  },

  
  async feedAllPens(limit, fertId) {
    if (!currentPlayer) return { ok: false, msg: 'Chưa đăng nhập!' };
    if (!currentPlayer.inventory) currentPlayer.inventory = {};
    if (!currentPlayer.inventory.feeds) currentPlayer.inventory.feeds = {};
    const stock = currentPlayer.inventory.feeds;
    let available = Object.keys(stock).filter(id => stock[id] > 0)
      .map(id => this.getFeed(id)).filter(Boolean)
      .sort((a, b) => (b.yieldBonus || 0) - (a.yieldBonus || 0));
    if (fertId) {
      const chosen = this.getFeed(fertId);
      if (!chosen || !(stock[fertId] > 0)) return { ok: false, msg: 'Không đủ loại cám đã chọn!' };
      available = [chosen];
    }
    if (!available.length) return { ok: false, msg: 'Không còn cám cho ăn trong kho!' };

    const max = (limit == null || limit === 'all') ? Infinity : Math.max(0, parseInt(limit, 10) || 0);
    let count = 0;
    for (const pen of currentPlayer.pens) {
      if (count >= max) break;
      if (!pen.animalId || this.isReady(pen) || this.isFertBoostActive(pen)) continue;
      if (pen.feedId) { pen.feedId = null; pen.feedAt = null; }
      let fert = available.find(f => (stock[f.id] || 0) > 0);
      if (!fert) break;
      stock[fert.id]--;
      if (stock[fert.id] <= 0) delete stock[fert.id];
      pen.feedId = fert.id;
      pen.feedAt = (typeof nowMs==="function"?nowMs():Date.now());
      count++;
    }
    if (count > 0) {
      this.addActivity(`Cho ăn ${count} chuồng`);
      await savePlayer();
    }
    return { ok: true, msg: count > 0 ? `Đã cho ăn cám ${count} ô!` : 'Không có ô nào cần bón.' };
  },

  
  BOOST_MS: 3 * 60 * 60 * 1000,
  
  BOOST_PREVIEW_MS: 10 * 1000,

  
  getCareBoostRemainingMs(pen, now = (typeof nowMs==="function"?nowMs():Date.now())) {
    if (!pen || !(pen.waterCount > 0) || !pen.lastWatered) return 0;
    const lw = this.toMs(pen.lastWatered);
    if (!Number.isFinite(lw) || lw <= 0) return 0;
    return Math.max(0, (lw + this.BOOST_MS) - now);
  },

  
  getFertBoostRemainingMs(pen, now = (typeof nowMs==="function"?nowMs():Date.now())) {
    if (!pen || !pen.feedId || !pen.feedAt) return 0;
    const fa = this.toMs(pen.feedAt);
    if (!Number.isFinite(fa) || fa <= 0) return 0;
    return Math.max(0, (fa + this.BOOST_MS) - now);
  },

  
  isCareBoostActive(pen, now = (typeof nowMs==="function"?nowMs():Date.now())) {
    return this.getCareBoostRemainingMs(pen, now) > 0;
  },

  
  isFertBoostActive(pen, now = (typeof nowMs==="function"?nowMs():Date.now())) {
    return this.getFertBoostRemainingMs(pen, now) > 0;
  },

  




  getCareDisplayState(pen, now = (typeof nowMs==="function"?nowMs():Date.now())) {
    const rem = this.getCareBoostRemainingMs(pen, now);
    if (rem <= 0 || rem <= this.BOOST_PREVIEW_MS) {
      return {
        active: false,
        nearExpiry: rem > 0 && rem <= this.BOOST_PREVIEW_MS,
        remainingMs: rem,
        text: 'Chưa chăm sóc',
        short: '0/3'
      };
    }
    const c = Math.min(3, pen.waterCount || 0);
    return {
      active: true,
      nearExpiry: false,
      remainingMs: rem,
      text: `${c}/3 💧`,
      short: `${c}/3`
    };
  },

  




  getFertDisplayState(pen, now = (typeof nowMs==="function"?nowMs():Date.now())) {
    const rem = this.getFertBoostRemainingMs(pen, now);
    if (rem <= 0 || rem <= this.BOOST_PREVIEW_MS || !pen.feedId) {
      return {
        active: false,
        nearExpiry: rem > 0 && rem <= this.BOOST_PREVIEW_MS,
        remainingMs: rem,
        text: 'Chưa cho ăn cám',
        fertId: null
      };
    }
    const fert = this.getFeed(pen.feedId);
    const name = fert ? `${fert.icon || ''} ${fert.name}`.trim() : pen.feedId;
    return {
      active: true,
      nearExpiry: false,
      remainingMs: rem,
      text: name,
      fertId: pen.feedId
    };
  },

  
  getBoostResetRemaining(pen) {
    if (!pen) return null;
    const now = (typeof nowMs==="function"?nowMs():Date.now());
    let ends = [];
    const w = this.getCareBoostRemainingMs(pen, now);
    if (w > 0) ends.push(now + w);
    const f = this.getFertBoostRemainingMs(pen, now);
    if (f > 0) ends.push(now + f);
    if (!ends.length) return null;
    const soonest = Math.min(...ends);
    return Math.max(0, Math.ceil((soonest - now) / 1000));
  },

  
  countFeedInBag() {
    if (!currentPlayer || !currentPlayer.inventory) return 0;
    const bag = currentPlayer.inventory.feeds || {};
    let n = 0;
    Object.keys(bag).forEach(id => {
      n += Math.max(0, Math.floor(Number(bag[id]) || 0));
    });
    return n;
  },

  
  pickBestFeedFromBag() {
    if (!currentPlayer || !currentPlayer.inventory) return null;
    if (!currentPlayer.inventory.feeds || typeof currentPlayer.inventory.feeds !== 'object') {
      currentPlayer.inventory.feeds = {};
    }
    const bag = currentPlayer.inventory.feeds;
    // Gộp id cũ phan-* → cam-*
    try {
      Object.keys(this.FEED_ID_ALIASES || {}).forEach(oldId => {
        if (!bag[oldId]) return;
        const nid = this.FEED_ID_ALIASES[oldId];
        bag[nid] = (Number(bag[nid]) || 0) + (Number(bag[oldId]) || 0);
        delete bag[oldId];
      });
    } catch (_) {}
    let best = null;
    let bestReduce = -1;
    Object.keys(bag).forEach(id => {
      const qty = Math.floor(Number(bag[id]) || 0);
      if (qty < 1) return;
      const fert = this.getFeed(id);
      if (!fert) return;
      const r = Number(fert.timeReduce) || 0;
      if (r > bestReduce) {
        bestReduce = r;
        best = fert;
      }
    });
    return best;
  },

  
  defaultFairyConfig() {
    return {
      waterMode: 'all',      
      waterCount: 12,
      useFeed: true,
      fertSource: 'any',     
      fertId: null,
      fertMode: 'all',       
      fertCount: 12,
      farmsEnabled: {},    
      byFarm: {},
      collectRain: true
    };
  },

  getFairyConfig() {
    const def = this.defaultFairyConfig();
    if (!currentPlayer) return { ...def };
    if (!currentPlayer.fairyConfig || typeof currentPlayer.fairyConfig !== 'object') {
      currentPlayer.fairyConfig = { ...def };
    }
    const c = currentPlayer.fairyConfig;
    if (c.waterMode !== 'count') c.waterMode = 'all';
    if (typeof c.waterCount !== 'number' || c.waterCount < 1) c.waterCount = def.waterCount;
    if (typeof c.useFeed !== 'boolean') c.useFeed = true;
    if (c.fertSource !== 'specific') c.fertSource = 'any';
    if (c.fertId === undefined) c.fertId = null;
    if (c.fertMode !== 'count') c.fertMode = 'all';
    if (typeof c.fertCount !== 'number' || c.fertCount < 1) c.fertCount = def.fertCount;
    if (!c.farmsEnabled || typeof c.farmsEnabled !== 'object') c.farmsEnabled = {};
    if (!c.byFarm || typeof c.byFarm !== 'object') c.byFarm = {};
    if (typeof c.customName !== 'string') c.customName = '';
    if (c.gender !== 'male' && c.gender !== 'female') c.gender = 'female';
    if (typeof c.collectRain !== 'boolean') c.collectRain = true;
    return c;
  },

  
  getFairyConfigForFarm(farmIndex) {
    const base = this.getFairyConfig();
    const key = String(farmIndex);
    const ov = (base.byFarm && base.byFarm[key]) || (base.byFarm && base.byFarm[farmIndex]) || null;
    if (!ov || typeof ov !== 'object') return { ...base, _farmIndex: farmIndex };
    return {
      ...base,
      waterMode: ov.waterMode === 'count' ? 'count' : (ov.waterMode === 'all' ? 'all' : base.waterMode),
      waterCount: typeof ov.waterCount === 'number' ? ov.waterCount : base.waterCount,
      useFeed: typeof ov.useFeed === 'boolean' ? ov.useFeed : base.useFeed,
      fertSource: ov.fertSource === 'specific' ? 'specific' : (ov.fertSource === 'any' ? 'any' : base.fertSource),
      fertId: ov.fertId !== undefined ? ov.fertId : base.fertId,
      fertMode: ov.fertMode === 'count' ? 'count' : (ov.fertMode === 'all' ? 'all' : base.fertMode),
      fertCount: typeof ov.fertCount === 'number' ? ov.fertCount : base.fertCount,
      _farmIndex: farmIndex
    };
  },

  getFairyDisplayName() {
    const n = (this.getFairyConfig().customName || '').trim();
    return n || 'Tiên';
  },

  getNycDisplayName() {
    const cfg = this.getNycConfig();
    const n = (cfg.customName || '').trim();
    return n || 'NYC';
  },

  getFairyGender() {
    return this.getFairyConfig().gender === 'male' ? 'male' : 'female';
  },

  getNycGender() {
    return this.getNycConfig().gender === 'male' ? 'male' : 'female';
  },

  getFairyEmoji() {
    return this.getFairyGender() === 'male' ? '🧙' : '🧚';
  },

  getNycEmoji() {
    return this.getNycGender() === 'male' ? '👨‍🌾' : '👩‍🌾';
  },

  
  isFairyFarmEnabled(farmIndex) {
    const cfg = this.getFairyConfig();
    const ge = cfg.farmsEnabled || {};
    if (ge[farmIndex] === false || ge[String(farmIndex)] === false) return false;
    return true;
  },

  isNycFarmEnabled(farmIndex) {
    const cfg = this.getNycConfig();
    const ge = cfg.farmsEnabled || {};
    const k = String(farmIndex);
    // Chỉ tắt khi ghi nhận explicit false (boolean)
    if (ge[k] === false || ge[farmIndex] === false) return false;
    // Array-style (hiếm): phần tử false
    if (Array.isArray(ge) && ge[Number(farmIndex)] === false) return false;
    return true;
  },

  setFairyConfig(cfg) {
    if (!currentPlayer) return { ok: false, msg: 'Chưa đăng nhập!' };
    const def = this.defaultFairyConfig();
    const prev = this.getFairyConfig();
    const ge = {};
    if (cfg && cfg.farmsEnabled && typeof cfg.farmsEnabled === 'object') {
      Object.keys(cfg.farmsEnabled).forEach(k => {
        ge[k] = !!cfg.farmsEnabled[k];
      });
    } else {
      Object.assign(ge, prev.farmsEnabled || {});
    }
    
    const byFarm = Object.assign({}, prev.byFarm || {});
    const gIdx = cfg && (cfg.farmIndex !== undefined && cfg.farmIndex !== null)
      ? String(cfg.farmIndex) : null;
    const careSlice = {
      waterMode: cfg && cfg.waterMode === 'count' ? 'count' : 'all',
      waterCount: Math.max(1, Math.min(99, parseInt(cfg && cfg.waterCount, 10) || def.waterCount)),
      useFeed: !!(cfg && cfg.useFeed),
      fertSource: cfg && cfg.fertSource === 'specific' ? 'specific' : 'any',
      fertId: (cfg && cfg.fertId) || null,
      fertMode: cfg && cfg.fertMode === 'count' ? 'count' : 'all',
      fertCount: Math.max(1, Math.min(99, parseInt(cfg && cfg.fertCount, 10) || def.fertCount))
    };
    if (careSlice.fertSource === 'specific' && careSlice.fertId && !this.getFeed(careSlice.fertId)) {
      return { ok: false, msg: 'Loại cám không hợp lệ!' };
    }
    if (gIdx !== null) {
      byFarm[gIdx] = careSlice;
      
      if (cfg && typeof cfg.farmEnabled === 'boolean') {
        ge[gIdx] = cfg.farmEnabled;
      }
    }
    const next = {
      
      ...careSlice,
      farmsEnabled: ge,
      byFarm,
      customName: (cfg && typeof cfg.customName === 'string') ? cfg.customName.trim().slice(0, 20) : (prev.customName || ''),
      gender: cfg && cfg.gender === 'male' ? 'male' : 'female',
      collectRain: cfg && typeof cfg.collectRain === 'boolean' ? cfg.collectRain : (typeof prev.collectRain === 'boolean' ? prev.collectRain : true)
    };
    currentPlayer.fairyConfig = next;
    const parts = [];
    if (gIdx !== null) parts.push('Trại ' + (Number(gIdx) + 1));
    parts.push(careSlice.waterMode === 'all' ? 'chăm hết ô' : `chăm ${careSlice.waterCount} ô`);
    if (careSlice.useFeed) {
      const src = careSlice.fertSource === 'specific'
        ? ((this.getFeed(careSlice.fertId) || {}).name || careSlice.fertId)
        : 'mọi loại trong kho';
      const n = careSlice.fertMode === 'all' ? 'hết ô' : `${careSlice.fertCount} ô`;
      parts.push(`cho ăn ${src} · ${n}`);
    } else {
      parts.push('không cho ăn phân');
    }
    // Chạy Tiên ngay sau khi lưu cấu hình (không đợi chu kỳ 3h)
    try {
      const now = (typeof nowMs === 'function' ? nowMs() : Date.now());
      this.ensureFarms();
      this.forEachFarm((pens, gi) => {
        if (!this.isFairyFarmEnabled(gi)) return;
        const prev = currentPlayer.pens;
        currentPlayer.pens = pens;
        this.runFairyCare(now);
        currentPlayer.pens = prev;
      });
      currentPlayer.lastFairyCare = now;
    } catch (e) { console.warn('fairy care after config', e); }
    return { ok: true, msg: 'Đã lưu: ' + parts.join(' · ') };
  },

  
  takeFertFromBagForFairy(cfg) {
    if (!currentPlayer.inventory) currentPlayer.inventory = {};
    if (!currentPlayer.inventory.feeds || typeof currentPlayer.inventory.feeds !== 'object') {
      currentPlayer.inventory.feeds = {};
    }
    const bag = currentPlayer.inventory.feeds;
    if (cfg.fertSource === 'specific') {
      let id = this.normalizeFeedId(cfg.fertId);
      // thử cả id gốc nếu alias khác
      let qty = Math.floor(Number(bag[id]) || 0);
      if (qty < 1 && cfg.fertId && bag[cfg.fertId]) {
        id = cfg.fertId;
        qty = Math.floor(Number(bag[id]) || 0);
      }
      if (!id || qty < 1) {
        
        const best = this.pickBestFeedFromBag();
        if (!best) return null;
        const q = Math.floor(Number(bag[best.id]) || 0);
        if (q < 1) return null;
        bag[best.id] = q - 1;
        if (bag[best.id] <= 0) delete bag[best.id];
        return best.id;
      }
      bag[id] = qty - 1;
      if (bag[id] <= 0) delete bag[id];
      return id;
    }
    
    const best = this.pickBestFeedFromBag();
    if (!best) return null;
    const q = Math.floor(Number(bag[best.id]) || 0);
    if (q < 1) return null;
    bag[best.id] = q - 1;
    if (bag[best.id] <= 0) delete bag[best.id];
    return best.id;
  },

  




  runFairyCare(now = (typeof nowMs==="function"?nowMs():Date.now())) {
    if (!currentPlayer || !currentPlayer.pens) return false;
    let wateredN = 0;
    let fertN = 0;
    const pens = Array.isArray(currentPlayer.pens)
      ? currentPlayer.pens
      : Object.values(currentPlayer.pens || {});
    if (!Array.isArray(currentPlayer.pens)) currentPlayer.pens = pens;
    const gi = typeof currentPlayer.activeFarm === 'number' ? currentPlayer.activeFarm : 0;
    if (!this.isFairyFarmEnabled(gi)) return false;
    const cfg = this.getFairyConfigForFarm(gi);

    
    let needCare = pens.filter(p => p && p.animalId);
    if (cfg.waterMode === 'count') {
      needCare = needCare.slice(0, Math.max(1, Number(cfg.waterCount) || 12));
    }
    for (let i = 0; i < needCare.length; i++) {
      const pen = needCare[i];
      pen.waterCount = 3;
      pen.watered = true;
      pen.lastWatered = now;
      wateredN++;
    }

    
    let needFertN = 0;
    let stoppedNoFert = false;
    if (cfg.useFeed) {
      let needFert = pens.filter(p => {
        if (!p || !p.animalId) return false;
        if (typeof this.isReadyAt === 'function' ? this.isReadyAt(p, now) : this.isReady(p)) return false;
        return !this.isFertBoostActive(p, now);
      });
      if (cfg.fertMode === 'count') {
        needFert = needFert.slice(0, Math.max(1, Number(cfg.fertCount) || 12));
      }
      needFertN = needFert.length;
      for (let i = 0; i < needFert.length; i++) {
        const pen = needFert[i];
        if (pen.feedId) {
          pen.feedId = null;
          pen.feedAt = null;
        }
        const fertId = this.takeFertFromBagForFairy(cfg);
        if (!fertId) {
          stoppedNoFert = true;
          break; 
        }
        pen.feedId = fertId;
        pen.feedAt = now; 
        fertN++;
      }
    }

    currentPlayer.lastFairyCare = now;
    if (wateredN > 0 || fertN > 0 || (cfg.useFeed && needFertN > 0)) {
      const emoji = this.getFairyEmoji ? this.getFairyEmoji() : '🧚';
      const name = this.getFairyDisplayName ? this.getFairyDisplayName() : 'Tiên';
      let msg = `${emoji} ${name} chăm: chăm ${wateredN} ô`;
      if (cfg.useFeed) {
        if (fertN > 0) {
          msg += `, cho ăn ${fertN} ô`;
          if (stoppedNoFert && fertN < needFertN) {
            msg += ` (hết cám giữa chừng, còn ${this.countFeedInBag()} trong kho)`;
          }
        } else if (needFertN === 0) {
          
          msg += ' (không ô cần bón)';
        } else {
          
          const left = this.countFeedInBag();
          msg += left > 0
            ? ` (không cho ăn được · kho còn ${left} — kiểm tra loại cám cấu hình)`
            : ' (hết cám trong kho)';
        }
      } else {
        msg += ' (không dùng cám)';
      }
      this.addActivity(msg, { type: 'fairy_care', at: now });
      
      if (wateredN > 0 && typeof Features !== 'undefined' && Features.trackQuest) {
        Features.trackQuest('water', wateredN * 3);
      }
    }
    return wateredN > 0 || fertN > 0;
  },

  




  fairyEnsureCareed(now = (typeof nowMs==="function"?nowMs():Date.now())) {
    if (!this.isFairyActive() || !currentPlayer || !currentPlayer.pens) return false;
    const pens = Array.isArray(currentPlayer.pens)
      ? currentPlayer.pens
      : Object.values(currentPlayer.pens || {});
    if (!Array.isArray(currentPlayer.pens)) currentPlayer.pens = pens;
    let n = 0;
    pens.forEach(pen => {
      if (!pen || !pen.animalId) return;
      
      const count = pen.waterCount || 0;
      const expired = !this.isCareBoostActive(pen, now);
      const missing = count < 3;
      const never = count <= 0 || !pen.lastWatered;
      if (!expired && !missing && !never) return;
      pen.waterCount = 3;
      pen.watered = true;
      pen.lastWatered = now;
      n++;
    });
    if (n > 0 && typeof Features !== 'undefined' && Features.trackQuest) {
      Features.trackQuest('water', n * 3);
    }
    return n > 0;
  },

  




  /**
   * Không trừ kho cám ở đây (tránh trừ mỗi giây khi tick).
   * Chỉ sửa timestamp nếu ô đã có feedId nhưng feedAt lỗi / mất hiệu lực hiển thị.
   * Việc trừ cám chỉ xảy ra trong runFairyCare (chu kỳ ~3h).
   */
  fairyEnsureFed(now = (typeof nowMs==="function"?nowMs():Date.now())) {
    if (!this.isFairyActive() || !currentPlayer || !currentPlayer.pens) return false;
    const pens = Array.isArray(currentPlayer.pens)
      ? currentPlayer.pens
      : Object.values(currentPlayer.pens || {});
    if (!Array.isArray(currentPlayer.pens)) currentPlayer.pens = pens;
    let n = 0;
    pens.forEach(pen => {
      if (!pen || !pen.animalId || !pen.feedId) return;
      if (this.isReady(pen)) return;
      // Có feedId nhưng feedAt không hợp lệ → gán lại now (KHÔNG trừ kho)
      const fa = this.toMs(pen.feedAt);
      if (!Number.isFinite(fa) || fa <= 0) {
        pen.feedAt = now;
        n++;
      }
    });
    return n > 0;
  },

  






  resetExpiredBoosts() {
    if (!currentPlayer) return false;
    this.ensureFarms();
    const now = (typeof nowMs==="function"?nowMs():Date.now());
    let changed = false;
    const fairy = this.isFairyActive();

    this.forEachFarm((pens, gi) => {
      const fairyHere = fairy && this.isFairyFarmEnabled(gi);
      if (fairyHere) {
        // Chỉ duy trì tưới (miễn phí). Cám chỉ trừ trong runFairyCare (chu kỳ BOOST_MS) — tránh trừ mỗi giây
        if (this.fairyEnsureCareed(now)) changed = true;
      } else {
        pens.forEach(pen => {
          if (!pen) return;
          if ((pen.waterCount || 0) > 0 && pen.lastWatered && !this.isCareBoostActive(pen, now)) {
            pen.waterCount = 0;
            pen.watered = false;
            pen.lastWatered = null;
            changed = true;
          }
          if (pen.feedId && pen.feedAt && !this.isFertBoostActive(pen, now)) {
            pen.feedId = null;
            pen.feedAt = null;
            changed = true;
          }
        });
      }
      pens.forEach(pen => {
        if (pen && pen.feedId && !pen.feedAt) {
          pen.feedAt = now;
          changed = true;
        }
      });
    });

    if (fairy) {
      const last = Number(currentPlayer.lastFairyCare) || 0;
      
      
      if (!last) {
        this.forEachFarm((pens, gi) => {
          if (!this.isFairyFarmEnabled(gi)) return;
          this.runFairyCare(now);
        });
        currentPlayer.lastFairyCare = now;
        changed = true;
      } else if (now - last >= this.BOOST_MS) {
        
        let careAt = last;
        while (careAt + this.BOOST_MS <= now) {
          careAt += this.BOOST_MS;
        }
        this.forEachFarm((pens, gi) => {
          if (!this.isFairyFarmEnabled(gi)) return;
          this.runFairyCare(careAt);
        });
        currentPlayer.lastFairyCare = careAt;
        changed = true;
      }
    }
    return changed;
  },

  
  getElapsedAt(pen, atMs) {
    if (!pen || !pen.animalId || !pen.raisedAt) return 0;
    const raisedAt = this.toMs(pen.raisedAt);
    if (!Number.isFinite(raisedAt) || raisedAt <= 0) return 0;
    return Math.max(0, (Number(atMs) - raisedAt) / 1000);
  },

  isReadyAt(pen, atMs) {
    if (!pen || !pen.animalId || !pen.raisedAt) return false;
    return this.getElapsedAt(pen, atMs) + 0.05 >= this.getEffectiveRaiseTime(pen, atMs);
  },

  
  getReadyAtMs(pen, atMs) {
    if (!pen || !pen.animalId || !pen.raisedAt) return null;
    // Dùng thời điểm đang xét (atMs / now) để tính buff tốc độ — KHÔNG dùng raisedAt
    // (nếu dùng raisedAt, ô mới nâng cấp sau khi nuôi sẽ bị offline bỏ sót, NYC realtime vẫn thu được)
    const ref = (atMs != null && Number.isFinite(Number(atMs)))
      ? Number(atMs)
      : ((typeof nowMs === 'function' ? nowMs() : Date.now()));
    const growSec = this.getEffectiveRaiseTime(pen, ref);
    const raisedAt = this.toMs(pen.raisedAt);
    if (!Number.isFinite(raisedAt) || raisedAt <= 0) return null;
    return raisedAt + growSec * 1000;
  },

  








  
  applyOfflineRainAt(t) {
    if (!currentPlayer) return { watered: 0, boosted: 0, collected: 0, collectCoins: 0, collectSeeds: 0 };
    this.ensureFarms();
    let watered = 0;
    let boosted = 0;
    let collected = 0;
    let collectCoins = 0;
    let collectSeeds = 0;
    const fairy = this.isFairyActive();
    this.forEachFarm((pens, gi) => {
      const fairyHere = fairy && this.isFairyFarmEnabled(gi);
      (pens || []).forEach(pen => {
        if (!pen || !pen.animalId || !pen.raisedAt) return;
        const ready = typeof this.isReadyAt === 'function'
          ? this.isReadyAt(pen, t)
          : this.isReady(pen);
        if (!ready) {
          const growSec = this.getEffectiveRaiseTime(pen);
          const elapsed = this.getElapsedAt(pen, t);
          const remain = Math.max(0, growSec - elapsed);
          const cut = Math.floor(remain * 0.12);
          if (cut > 0) {
            pen.raisedAt -= cut * 1000;
            boosted++;
          }
        }
        if (fairyHere) {
          pen.waterCount = 3;
          pen.watered = true;
          pen.lastWatered = t;
          watered++;
        }
      });
    });
    
    const collectOn = fairy && this.getFairyConfig().collectRain !== false;
    if (collectOn) {
      const n = 3 + Math.floor(Math.random() * 4);
      if (!currentPlayer.inventory) currentPlayer.inventory = { animals: {}, harvest: {}, feeds: {} };
      if (!currentPlayer.inventory.animals) currentPlayer.inventory.animals = {};
      for (let i = 0; i < n; i++) {
        if (Math.random() < 0.55) {
          const coins = 5 + Math.floor(Math.random() * 11);
          currentPlayer.coins = (currentPlayer.coins || 0) + coins;
          collectCoins += coins;
        } else {
          const animals = (this.getAnimals() || []).filter(p => p && p.id);
          if (animals.length) {
            const animal = animals[Math.floor(Math.random() * animals.length)];
            currentPlayer.inventory.animals[animal.id] = (currentPlayer.inventory.animals[animal.id] || 0) + 1;
            collectSeeds++;
          } else {
            const coins = 8;
            currentPlayer.coins = (currentPlayer.coins || 0) + coins;
            collectCoins += coins;
          }
        }
        collected++;
      }
      currentPlayer.rainedCollectOnce = true;
    }
    return { watered, boosted, collected, collectCoins, collectSeeds };
  },

  



  



  _nycHarvestOneAt(pen, t, gi, cfg, doReRaise, silent, force) {
    if (!pen || !pen.animalId || !pen.raisedAt) return { harvested: 0, raised: 0, amount: 0, animalName: '', animalId: null, animalStar: false };
    if (!force && !this.isReadyAt(pen, t)) return { harvested: 0, raised: 0, amount: 0, animalName: '', animalId: null, animalStar: false };
    const animal = this.getAnimal(pen.animalId);
    // Cho phép thu cả khi thiếu định nghĩa động vật (tránh mất vụ offline)
    if (!animal && !force) return { harvested: 0, raised: 0, amount: 0, animalName: '', animalId: null, animalStar: false };
    let amount = (animal && animal.yield) ? animal.yield : 1;
    if (pen.feedId) {
      const fert = this.getFeed(pen.feedId);
      if (fert && fert.yieldBonus) amount = Math.ceil(amount * (1 + fert.yieldBonus));
    }
    if ((pen.waterCount || 0) >= 2) amount = Math.ceil(amount * 1.1);
    amount = this.applySeedYieldBonus(pen, amount);
    const animalStarFlag = !!pen.animalStar;
    const hid = pen.animalId;
    const animalName = (animal && animal.name) ? animal.name : String(hid || 'con');
    if (!currentPlayer.inventory) currentPlayer.inventory = {};
    this.stashHarvestProduct(hid, amount, pen);
    currentPlayer.stats = currentPlayer.stats || {};
    currentPlayer.stats.harvested = (currentPlayer.stats.harvested || 0) + amount;
    this.unlockCollection(hid);
    this.addXp(Math.ceil(((animal && animal.xp) || 5) * this.getSeedXpMult(pen)));
    pen.animalId = null;
    pen.raisedAt = null;
    pen.watered = false;
    pen.waterCount = 0;
    pen.lastWatered = null;
    pen.feedId = null;
    pen.feedAt = null;
    pen.animalStar = false;
    pen.seedMyth = false;
    let raisedCount = 0;
    let reRaiseName = '';
    if (doReRaise && cfg && cfg.animalId) {
      if (this._nycAnimalOneAt(pen, cfg, t, gi)) {
        raisedCount = 1;
        const rp = this.getAnimal(cfg.animalId);
        reRaiseName = (rp && rp.name) ? rp.name : String(cfg.animalId);
      }
    }
    
    if (!silent) {
      const _tierTag = this.getPenSeedTier(pen) === 'myth' ? ' ✨' : (animalStarFlag || pen.animalStar ? ' ⭐' : '');
      let logMsg = 'Thu hoạch ' + amount + ' ' + animalName + _tierTag;
      if (raisedCount && reRaiseName) logMsg += ' · NYC nuôi lại ' + reRaiseName;
      this.addActivity(logMsg, { type: 'harvest_offline', at: t, penFarm: gi });
    }
    return { harvested: 1, raisedCount, amount, animalName, animalId: hid, animalStar: animalStarFlag, reRaiseName };
  },

  




  _nextNycReadyAt(untilMs, opts) {
    if (!currentPlayer || !currentPlayer.farms) return null;
    const requireActive = !(opts && opts.requireActive === false);
    if (requireActive && !this.isNycActive()) return null;
    let best = null;
    for (let gi = 0; gi < currentPlayer.farms.length; gi++) {
      if (!this.isNycFarmEnabled(gi)) continue;
      const pens = currentPlayer.farms[gi];
      if (!Array.isArray(pens)) continue;
      for (const pen of pens) {
        if (!pen || !pen.animalId || !pen.raisedAt) continue;
        // Ép buff trước khi tính ready (x50 + tưới)
        const perm = Number(pen.specialMultPermanent) || 0;
        if (perm >= 2) pen.specialMult = Math.max(Number(pen.specialMult) || 1, perm);
        if ((pen.waterCount || 0) < 3) {
          pen.waterCount = 3;
          pen.watered = true;
        }
        const pa = this.toMs(pen.raisedAt);
        if (pa) pen.raisedAt = pa;
        const readyAt = this.getReadyAtMs(pen, untilMs);
        if (readyAt == null || readyAt > untilMs) continue;
        if (best == null || readyAt < best) best = readyAt;
      }
    }
    return best;
  },

  




  async simulateOfflineCare() {
    if (!currentPlayer) return { ok: false, changed: false, notes: [] };
    this.ensureFarms();
    const now = (typeof nowMs==="function"?nowMs():Date.now());
    
    const fromLog = currentPlayer._needOfflineFromLog && currentPlayer._logEarliest
      ? Number(currentPlayer._logEarliest)
      : null;
    const lastCatch = Number(currentPlayer.lastCatchUpAt) || 0;
    let lastSeen = Number(currentPlayer.lastSeenAt) || 0;
    let awayMark = 0;
    try {
      if (typeof currentUser !== 'undefined' && currentUser && currentUser.uid) {
        awayMark = Number(localStorage.getItem('vuon_away_' + currentUser.uid)) || 0;
      }
    } catch (_) {}

    // Lấy mốc rời SỚM NHẤT có thể (tránh lastSeen bị heartbeat/ghi đè gần đây làm mất cửa sổ offline)
    let leaveAt = 0;
    const candidates = [lastSeen, awayMark, lastCatch, Number(currentPlayer.timersSyncedAt) || 0, Number(currentPlayer.updatedAt) || 0]
      .filter(v => Number(v) > 0);
    if (candidates.length) leaveAt = Math.min.apply(null, candidates);
    if (!leaveAt) leaveAt = now;

    let from = Math.max(lastCatch, leaveAt);
    // Nếu awayMark cũ hơn lastCatch rõ rệt (user thoát web lâu) → ưu tiên awayMark để bù đủ
    if (awayMark > 0 && awayMark < lastCatch && (lastCatch - awayMark) > 60000) {
      from = awayMark;
    }
    if (fromLog && fromLog < from) {
      from = Math.max(0, fromLog - 1000);
    }
    from = Math.min(now, Math.max(0, from));

    
    
    const OFFLINE_MIN_MS = 30 * 1000;
    const OFFLINE_LOG_MIN_MS = 60 * 1000;
    const offlineGap = now - from;
    if (offlineGap < OFFLINE_MIN_MS) {
      currentPlayer.lastCatchUpAt = now;
      currentPlayer.lastSeenAt = now;
      delete currentPlayer._needOfflineFromLog;
      delete currentPlayer._logEarliest;
      try {
        if (typeof currentUser !== 'undefined' && currentUser && currentUser.uid) {
          localStorage.removeItem('vuon_away_' + currentUser.uid);
        }
      } catch (_) {}
      return { ok: true, changed: false, notes: [], offlineMs: offlineGap, skipped: true };
    }

    let changed = false;
    const notes = [];
    let totalHarvest = 0; 
    let totalAnimal = 0;   
    let totalYieldAmount = 0;
    const harvestedPenKeys = new Set(); 
    
    const harvestByAnimal = {};
    const harvestByFarm = {}; 
    let fairyCycles = 0;
    let helperBuys = 0;
    let rainHits = 0;
    let rainCareed = 0;
    let rainCollected = 0;
    let rainCollectCoins = 0;
    let rainCollectSeeds = 0;
    
    let totalPensAll = 0;
    let nycEnabledFarms = 0;
    let pensOnNycFarms = 0;
    let pensWithAnimalAtStart = 0;
    const penCountByFarm = {};
    const nycFarmIndexes = [];
    const farmDiag = {}; // per-farm offline diagnostics
    for (let gi0 = 0; gi0 < (currentPlayer.farms || []).length; gi0++) {
      const pl = currentPlayer.farms[gi0];
      if (!Array.isArray(pl)) continue;
      totalPensAll += pl.length;
      penCountByFarm[String(gi0)] = pl.length;
      if (this.isNycFarmEnabled(gi0)) {
        nycEnabledFarms++;
        pensOnNycFarms += pl.length;
        nycFarmIndexes.push(gi0);
        let withAnimal = 0;
        let minReadyMs = null;
        let maxMult = 1;
        let sampleGrow = null;
        pl.forEach(p => {
          if (p && p.animalId) {
            withAnimal++;
            pensWithAnimalAtStart++;
            // Ép giữ tốc độ đang có lúc bắt đầu offline (tránh temp hết hạn → 0 vụ)
            const sm = this.getPenSpeedMult(p, from);
            if (sm >= 2) {
              const curPerm = Number(p.specialMultPermanent) || 0;
              if (curPerm < sm) p.specialMultPermanent = sm;
              p.specialMult = Math.max(Number(p.specialMult) || 1, sm);
            }
            if (sm > maxMult) maxMult = sm;
            const readyAt = this.getReadyAtMs(p, from);
            if (readyAt != null && (minReadyMs == null || readyAt < minReadyMs)) minReadyMs = readyAt;
            const g = this.getEffectiveRaiseTime(p, from);
            if (g > 0 && (sampleGrow == null || g < sampleGrow)) sampleGrow = g;
          }
        });
        let seedLeft = 0;
        let cfgAnimal = null;
        try {
          const gcfg = this.getNycConfigForFarm(gi0);
          cfgAnimal = gcfg && gcfg.animalId ? gcfg.animalId : null;
          if (cfgAnimal) {
            const kind = gcfg.seedKind === 'star' ? 'star' : 'normal';
            const bag = kind === 'star'
              ? ((currentPlayer.inventory && currentPlayer.inventory.animalsStar) || {})
              : ((currentPlayer.inventory && currentPlayer.inventory.animals) || {});
            seedLeft = bag[cfgAnimal] || 0;
            if (this.isUnlimitedResources && this.isUnlimitedResources()) seedLeft = 999999;
          }
        } catch (_) {}
        farmDiag[String(gi0)] = {
          withAnimal, minReadyMs, maxMult, sampleGrow, seedLeft, cfgAnimal,
          raiseFailed: 0, emptyAtStart: pl.length - withAnimal
        };
      }
    }

    
    const events = [];
    // Mưa cố định mỗi 30 phút
    const rainChance = 100;
    const rainStep = this.RAIN_INTERVAL_MS || (30 * 60 * 1000);
    let rainT = from + rainStep;
    let rainGuard = 0;
    while (rainT <= now && rainGuard++ < 2000) {
      events.push({ t: rainT, type: 'rain' });
      rainT += rainStep;
    }
    
    
    
    const fairyCovered = this.isFairyActiveAt(from) || this.isFairyActive();
    if (fairyCovered) {
      let careAt = Number(currentPlayer.lastFairyCare) || 0;
      if (!careAt) {
        if (this.isFairyActiveAt(from)) {
          events.push({ t: from, type: 'fairy' });
          careAt = from;
        }
        while (careAt && careAt + this.BOOST_MS <= now) {
          careAt += this.BOOST_MS;
          if (this.isFairyActiveAt(careAt)) events.push({ t: careAt, type: 'fairy' });
          else break;
        }
      } else {
        while (careAt + this.BOOST_MS <= now) {
          careAt += this.BOOST_MS;
          if (this.isFairyActiveAt(careAt)) events.push({ t: careAt, type: 'fairy' });
          else break;
        }
      }
    }
    events.sort((a, b) => a.t - b.t || (a.type === 'rain' ? -1 : 1));
    let evIdx = 0;

    
    const nycBuffOn = this.getBuffPrefs().nycEnabled !== false;
    const nycUntilMs = Number(currentPlayer.nycUntil) || 0;
    const nycCovered = nycBuffOn && nycUntilMs > from;
    const activeFarm = currentPlayer.activeFarm || 0;
    this.syncActiveFarm();

    
    
    if (this.isFairyActiveAt(from)) {
      this.forEachFarm((pens, gi) => {
        if (!this.isFairyFarmEnabled(gi)) return;
        (pens || []).forEach(pen => {
          if (!pen || !pen.animalId) return;
          pen.waterCount = 3;
          pen.watered = true;
          pen.lastWatered = from;
        });
        
        const fcfg = this.getFairyConfigForFarm
          ? this.getFairyConfigForFarm(gi)
          : this.getFairyConfig();
        if (fcfg && fcfg.useFeed) {
          (pens || []).forEach(pen => {
            if (!pen || !pen.animalId) return;
            if (this.isReadyAt(pen, from)) return;
            if (this.isFertBoostActive && this.isFertBoostActive(pen, from)) return;
            const fid = this.takeFertFromBagForFairy(fcfg);
            if (!fid) return;
            pen.feedId = fid;
            pen.feedAt = from;
          });
        }
      });
      changed = true;
    }

    
    if (nycCovered) {
      const raiseAt = from;
      if (this.isNycActiveAt(raiseAt)) {
        for (let gi = 0; gi < currentPlayer.farms.length; gi++) {
          if (!this.isNycFarmEnabled(gi)) continue;
          const gcfg = this.getNycConfigForFarm(gi);
          if (!gcfg.animalId) continue;
          currentPlayer.activeFarm = gi;
          currentPlayer.pens = currentPlayer.farms[gi];
          const n = this._nycAnimalEmptiesAt(currentPlayer.pens, gcfg, raiseAt, gi);
          if (n > 0) {
            totalAnimal += n;
            changed = true;
            const gKey = String(gi);
            if (!harvestByFarm[gKey]) {
              harvestByFarm[gKey] = {
                pens: new Set(), cycles: 0, amount: 0, raised: 0,
                animalIds: {}, growSamples: []
              };
            }
            harvestByFarm[gKey].raised += n;
            if (gcfg.animalId) {
              harvestByFarm[gKey].animalIds[gcfg.animalId] =
                (harvestByFarm[gKey].animalIds[gcfg.animalId] || 0) + n;
            }
          }
          currentPlayer.farms[gi] = currentPlayer.pens;
        }
      }
    }

    
    const recordHarvestStat = (r, penKey, growSecSample) => {
      if (!r || !r.harvested) return;
      totalHarvest += r.harvested;
      totalAnimal += r.raised || 0;
      totalYieldAmount += r.amount || 0;
      if (plotKey != null && penKey !== '') {
        const pk = String(plotKey);
        harvestedPenKeys.add(pk);
        const giPart = pk.split(':')[0];
        if (!harvestByFarm[giPart]) {
          harvestByFarm[giPart] = {
            pens: new Set(), cycles: 0, amount: 0, raised: 0,
            animalIds: {}, growSamples: []
          };
        }
        const g = harvestByFarm[giPart];
        g.pens.add(pk);
        g.cycles += 1;
        g.amount += r.amount || 0;
        g.raised += r.raised || 0;
        if (r.animalId) {
          g.animalIds[r.animalId] = (g.animalIds[r.animalId] || 0) + 1;
        }
        if (typeof growSecSample === 'number' && growSecSample > 0 && g.growSamples.length < 5) {
          g.growSamples.push(growSecSample);
        }
      }
      const key = (r.animalName || 'con') + (r.animalStar ? ' ⭐' : '');
      if (!harvestByAnimal[key]) harvestByAnimal[key] = { cycles: 0, amount: 0 };
      harvestByAnimal[key].cycles += 1;
      harvestByAnimal[key].amount += r.amount || 0;
      changed = true;
    };

    
    const nycHarvestReraiseAt = (t) => {
      if (!nycBuffOn) return;
      const canReRaise = this.isNycActiveAt(t) || this.isNycActive();
      for (let gi = 0; gi < currentPlayer.farms.length; gi++) {
        if (!this.isNycFarmEnabled(gi)) continue;
        const cfg = this.getNycConfigForFarm(gi) || {};
        currentPlayer.activeFarm = gi;
        currentPlayer.pens = currentPlayer.farms[gi];
        let pens = currentPlayer.pens;
        if (!Array.isArray(pens)) {
          if (pens && typeof pens === 'object') {
            const keys = Object.keys(pens).filter(k => /^\d+$/.test(k)).sort((a, b) => Number(a) - Number(b));
            pens = keys.map(k => pens[k]);
            currentPlayer.farms[gi] = pens;
            currentPlayer.pens = pens;
          } else continue;
        }
        for (let i = 0; i < pens.length; i++) {
          const pen = pens[i];
          if (!pen || !pen.animalId) continue;
          // Ép permanent + chăm trước khi tính ready (khớp x50 offline)
          const perm = Number(pen.specialMultPermanent) || 0;
          if (perm >= 2) pen.specialMult = Math.max(Number(pen.specialMult) || 1, perm);
          if ((pen.waterCount || 0) < 3) {
            pen.waterCount = 3;
            pen.watered = true;
            if (!pen.lastWatered) pen.lastWatered = t;
          }
          if (!(Number(pen.baseRaiseTime) > 0)) {
            const anDef = this.getAnimal(pen.animalId);
            if (anDef && Number(anDef.raiseTime) > 0) pen.baseRaiseTime = Number(anDef.raiseTime);
          }
          // Chuẩn hóa raisedAt
          const pa = this.toMs(pen.raisedAt);
          if (pa) pen.raisedAt = pa;

          const readyAt = this.getReadyAtMs(pen, t);
          if (readyAt == null || readyAt > t + 50) continue;

          const growSec = this.getEffectiveRaiseTime(pen, t);
          // force=true để không bỏ sót khi isReadyAt lệch nhẹ
          const r = this._nycHarvestOneAt(pen, t, gi, cfg, canReRaise && !!cfg.animalId, true, true);
          if (r && r.harvested) {
            recordHarvestStat(r, gi + ':' + i, growSec);
            // Sau reRaise: ép chăm để vòng sau tính đúng growSec ngắn
            if (pen.animalId) {
              pen.waterCount = 3;
              pen.watered = true;
              pen.lastWatered = t;
              if (perm >= 2) pen.specialMult = Math.max(Number(pen.specialMult) || 1, perm);
            }
          }
        }
        if (canReRaise && cfg && cfg.animalId) {
          const extra = this._nycAnimalEmptiesAt(pens, cfg, t, gi);
          if (extra > 0) {
            totalAnimal += extra;
            changed = true;
            const gKey = String(gi);
            if (!harvestByFarm[gKey]) {
              harvestByFarm[gKey] = {
                pens: new Set(), cycles: 0, amount: 0, raised: 0,
                animalIds: {}, growSamples: []
              };
            }
            harvestByFarm[gKey].raised += extra;
            if (cfg.animalId) {
              harvestByFarm[gKey].animalIds[cfg.animalId] =
                (harvestByFarm[gKey].animalIds[cfg.animalId] || 0) + extra;
            }
            // Chăm chuồng mới nuôi
            (pens || []).forEach(p => {
              if (p && p.animalId && (p.waterCount || 0) < 3) {
                p.waterCount = 3;
                p.watered = true;
                p.lastWatered = t;
              }
            });
          }
        }
        currentPlayer.farms[gi] = pens;
      }
    };

    
    
    // Chỉ xử lý mưa + Tiên theo mốc thời gian (NYC thu/nuôi do continuous bên dưới)
    {
      let guard = 0;
      while (evIdx < events.length && guard++ < 5000) {
        const ev = events[evIdx];
        if (!ev || ev.t > now) break;
        evIdx++;
        if (ev.type === 'rain') {
          const r = this.applyOfflineRainAt(ev.t);
          rainHits++;
          rainCareed += r.watered || 0;
          if (r.collected) {
            rainCollected = (rainCollected || 0) + (r.collected || 0);
            rainCollectCoins = (rainCollectCoins || 0) + (r.collectCoins || 0);
            rainCollectSeeds = (rainCollectSeeds || 0) + (r.collectSeeds || 0);
          }
          if (r.watered || r.boosted || r.collected) changed = true;
        } else if (ev.type === 'fairy' && this.isFairyActiveAt(ev.t)) {
          this.forEachFarm((pens, gi) => {
            if (!this.isFairyFarmEnabled(gi)) return;
            this.runFairyCare(ev.t);
          });
          currentPlayer.lastFairyCare = ev.t;
          fairyCycles++;
          changed = true;
        }
      }
    }

    // ── Offline NYC: multi-cycle theo thời gian offline (math) ──
    // Tôn trọng raisedAt thật của từng ô — không ép harvest/reRaise khi chưa chín
    // (trước đây bỏ qua raisedAt + force ≥1 vòng khi offline ≥30s → reset tiến độ nuôi)
    {
      const endMs = now;
      const offlineSec = Math.max(0, (endMs - from) / 1000);

      // Chuẩn hóa nycUntil
      const nycUntilMs = this.toMs(currentPlayer.nycUntil) || Number(currentPlayer.nycUntil) || 0;
      if (nycUntilMs > 0) currentPlayer.nycUntil = nycUntilMs;
      const canReRaise = nycBuffOn && (
        nycUntilMs > endMs || nycUntilMs > from || this.isNycActive() || this.isNycActiveAt(endMs) || this.isNycActiveAt(from)
      );

      // Pre-buff mọi ô NYC — giữ nguyên raisedAt hợp lệ
      // Lấy sampleGrow = MIN (nhanh nhất) để nCycles debug không bị "ô chậm đầu tiên" chặn toàn bộ
      // QUAN TRỌNG: nếu ô đang có tốc độ cao tại mốc from → ép permanent để không bị mất buff khi specialMultUntil hết hạn giữa offline
      let sampleGrow = null;
      let sampleMult = 1;
      this.forEachFarm((pens, gi) => {
        if (!this.isNycFarmEnabled(gi)) return;
        (pens || []).forEach(p => {
          if (!p) return;
          // Ép giữ tốc độ đang có lúc bắt đầu offline (tránh temp hết hạn → offline 0 vụ)
          const multAtFrom = this.getPenSpeedMult(p, from);
          if (multAtFrom >= 2) {
            const curPerm = Number(p.specialMultPermanent) || 0;
            if (curPerm < multAtFrom) {
              p.specialMultPermanent = multAtFrom;
            }
            p.specialMult = Math.max(Number(p.specialMult) || 1, multAtFrom);
            // Xóa until cũ để không bị logic temp làm rơi về x1 giữa cửa sổ offline
            if (p.specialMultUntil && this.toMs(p.specialMultUntil) > 0 && this.toMs(p.specialMultUntil) < endMs) {
              p.specialMultUntil = 0;
            }
          }
          const perm = Number(p.specialMultPermanent) || 0;
          if (perm >= 2) p.specialMult = Math.max(Number(p.specialMult) || 1, perm);
          if (perm > sampleMult) sampleMult = perm;
          if (multAtFrom > sampleMult) sampleMult = multAtFrom;
          if (p.animalId) {
            p.waterCount = 3;
            p.watered = true;
            if (!p.lastWatered) p.lastWatered = from;
            if (!(Number(p.baseRaiseTime) > 0)) {
              try {
                const anDef = this.getAnimal(p.animalId);
                if (anDef && Number(anDef.raiseTime) > 0) p.baseRaiseTime = Number(anDef.raiseTime);
              } catch (_) {}
            }
            const pa = this.toMs(p.raisedAt);
            if (pa && pa > 0) {
              // Giữ raisedAt gốc; chỉ clamp nếu lệch tương lai quá xa (clock skew)
              p.raisedAt = (pa > endMs + 60000) ? endMs : pa;
            } else {
              // Thiếu raisedAt → coi như nuôi từ đầu cửa sổ offline (không reset con đang có)
              p.raisedAt = from;
            }
            // Tính grow với endMs SAU KHI đã ép permanent
            const g = this.getEffectiveRaiseTime(p, endMs);
            if (g > 0 && (sampleGrow == null || g < sampleGrow)) sampleGrow = g;
          }
        });
      });

      if (!(sampleGrow > 0)) sampleGrow = 300;
      sampleGrow = Math.max(20, sampleGrow);

      // Ước lượng vòng (chỉ để debug / ghi chú) — KHÔNG dùng để ép harvest / chặn vòng lặp
      let nCycles = Math.floor(offlineSec / sampleGrow);
      if (nCycles < 1 && offlineSec >= sampleGrow * 0.85) nCycles = 1;
      // Đã bỏ: if (nCycles < 1 && offlineSec >= 30) nCycles = 1;
      if (!canReRaise) nCycles = Math.min(nCycles, 1);
      nCycles = Math.max(0, Math.min(600, nCycles));

      currentPlayer._offlineNycDebug = {
        canReRaiseNow: !!canReRaise,
        nycUntilMs,
        endMs,
        from,
        offlineSec: Math.round(offlineSec),
        nycBuffOn: !!nycBuffOn,
        mode: 'math-cycles-remaining-v2',
        sampleGrow: Math.round(sampleGrow),
        nCycles,
        sampleMult
      };

      // Luôn chạy per-pen khi NYC bật — không phụ thuộc nCycles global (tránh ô chậm đầu tiên chặn ô nhanh)
      if (nycBuffOn) {
        for (let gi = 0; gi < (currentPlayer.farms || []).length; gi++) {
          try {
            if (!this.isNycFarmEnabled(gi)) continue;
            const cfg = this.getNycConfigForFarm(gi) || {};
            let pens = currentPlayer.farms[gi];
            if (!Array.isArray(pens)) {
              if (pens && typeof pens === 'object') {
                const keys = Object.keys(pens).filter(k => /^\d+$/.test(k)).sort((a, b) => Number(a) - Number(b));
                pens = keys.map(k => pens[k]);
                currentPlayer.farms[gi] = pens;
              } else continue;
            }
            currentPlayer.activeFarm = gi;
            currentPlayer.pens = pens;

            // Nuôi ô trống lần đầu nếu cần
            if (canReRaise && cfg.animalId) {
              const n0 = this._nycAnimalEmptiesAt(pens, cfg, from, gi);
              if (n0 > 0) {
                totalAnimal += n0;
                changed = true;
                const gKey = String(gi);
                if (!harvestByFarm[gKey]) {
                  harvestByFarm[gKey] = { pens: new Set(), cycles: 0, amount: 0, raised: 0, animalIds: {}, growSamples: [] };
                }
                harvestByFarm[gKey].raised += n0;
                harvestByFarm[gKey].animalIds[cfg.animalId] = (harvestByFarm[gKey].animalIds[cfg.animalId] || 0) + n0;
              }
            }

            for (let i = 0; i < pens.length; i++) {
              const pen = pens[i];
              if (!pen) continue;

              // Lấy growSec riêng từng ô (có x50) — ép permanent lần nữa trước khi tính
              const multAtFrom = this.getPenSpeedMult(pen, from);
              if (multAtFrom >= 2) {
                const curPerm = Number(pen.specialMultPermanent) || 0;
                if (curPerm < multAtFrom) pen.specialMultPermanent = multAtFrom;
                pen.specialMult = Math.max(Number(pen.specialMult) || 1, multAtFrom);
              }
              const perm = Number(pen.specialMultPermanent) || 0;
              if (perm >= 2) pen.specialMult = Math.max(Number(pen.specialMult) || 1, perm);

              // Đảm bảo có con để bắt đầu chuỗi
              if (!pen.animalId) {
                if (!(canReRaise && cfg.animalId && this._nycAnimalOneAt(pen, cfg, from, gi))) continue;
              }

              pen.waterCount = 3;
              pen.watered = true;
              // Ưu tiên grow tại from (đã ép permanent), fallback endMs / sampleGrow
              let growSec = this.getEffectiveRaiseTime(pen, from);
              if (!Number.isFinite(growSec) || growSec < 20) {
                growSec = this.getEffectiveRaiseTime(pen, endMs);
              }
              if ((!Number.isFinite(growSec) || growSec < 20 || (multAtFrom >= 2 && growSec > sampleGrow * 1.5)) && sampleGrow > 0) {
                growSec = sampleGrow;
              }
              growSec = Math.max(20, growSec);
              const growMs = growSec * 1000;

              // Tính vòng dựa trên raisedAt THẬT + remaining thực tế
              let raiseStart = this.toMs(pen.raisedAt) || Number(pen.raisedAt) || from;
              if (!(raiseStart > 0) || raiseStart > endMs) raiseStart = from;

              // Elapsed tại from → remaining chính xác hơn công thức raisedAt + full grow
              const elapsedAtFrom = Math.max(0, (from - raiseStart) / 1000);
              let remainSec = Math.max(0, growSec - elapsedAtFrom);
              // Thời điểm chín đầu tiên
              let firstReadyAt = from + remainSec * 1000;
              // Nếu đã chín trước/trong lúc rời (hoặc rất sát) → thu ngay tại from
              if (remainSec <= 0.05 || firstReadyAt <= from + 50) {
                firstReadyAt = from;
                remainSec = 0;
              }
              // Grace nhỏ cho sai số float / clock (0.5s)
              if (firstReadyAt > endMs && firstReadyAt <= endMs + 500) {
                firstReadyAt = endMs;
              }

              // Số vòng hoàn chỉnh trong [firstReadyAt .. endMs]
              let penCycles = 0;
              if (firstReadyAt <= endMs + 50) {
                penCycles = 1 + Math.floor(Math.max(0, endMs - firstReadyAt) / growMs);
              }
              // Nếu isReadyAt tại endMs mà math ra 0 → vẫn cho 1 vòng (tránh lệch do mult/weather)
              if (plotCycles < 1 && this.isReadyAt(pen, endMs)) {
                penCycles = 1;
                firstReadyAt = endMs;
              }
              if (!canReRaise) penCycles = Math.min(plotCycles, 1);
              penCycles = Math.max(0, Math.min(600, penCycles));

              // Không có vòng chín thật sự → giữ nguyên raisedAt, bỏ qua ô này
              if (plotCycles < 1) continue;

              for (let c = 0; c < penCycles; c++) {
                const harvestT = Math.min(endMs, firstReadyAt + c * growMs);
                if (harvestT > endMs + 50) break;

                // Có con?
                if (!pen.animalId) {
                  if (!(canReRaise && cfg.animalId && this._nycAnimalOneAt(pen, cfg, harvestT - growMs, gi))) break;
                }

                // Chỉ chỉnh raisedAt về đúng mốc chín của vòng này (không reset tùy tiện)
                pen.raisedAt = harvestT - growMs;
                pen.waterCount = 3;
                pen.watered = true;
                if (perm >= 2) pen.specialMult = Math.max(Number(pen.specialMult) || 1, perm);

                let r = null;
                try {
                  r = this._nycHarvestOneAt(pen, harvestT, gi, cfg, canReRaise && !!cfg.animalId, true, true);
                } catch (e) {
                  console.warn('math harvest', gi, i, c, e);
                  break;
                }

                if (!r || !r.harvested) {
                  // Fallback
                  const hid = pen.animalId;
                  if (!hid) break;
                  const animal = this.getAnimal(hid);
                  let amount = (animal && animal.yield) ? animal.yield : 1;
                  amount = this.applySeedYieldBonus(pen, amount);
                  if ((pen.waterCount || 0) >= 2) amount = Math.ceil(amount * 1.1);
                  if (!currentPlayer.inventory) currentPlayer.inventory = {};
                  this.stashHarvestProduct(hid, amount, pen);
                  currentPlayer.stats = currentPlayer.stats || {};
                  currentPlayer.stats.harvested = (currentPlayer.stats.harvested || 0) + amount;
                  const animalName = (animal && animal.name) || String(hid);
                  const wasStar = !!pen.animalStar;
                  pen.animalId = null;
                  pen.raisedAt = null;
                  pen.waterCount = 0;
                  pen.watered = false;
                  pen.feedId = null;
                  pen.animalStar = false;
    pen.seedMyth = false;
                  const fake = { harvested: 1, raised: 0, amount, animalName, animalId: hid, animalStar: wasStar };
                  if (canReRaise && cfg.animalId && this._nycAnimalOneAt(pen, cfg, harvestT, gi)) {
                    fake.raised = 1;
                  }
                  recordHarvestStat(fake, gi + ':' + i, growSec);
                  r = fake;
                } else {
                  recordHarvestStat(r, gi + ':' + i, growSec);
                }

                // Chuẩn bị vòng sau
                if (c < penCycles - 1) {
                  if (!pen.animalId) {
                    if (!(canReRaise && cfg.animalId && this._nycAnimalOneAt(pen, cfg, harvestT, gi))) break;
                  }
                  if (pen.animalId) {
                    pen.raisedAt = harvestT;
                    pen.waterCount = 3;
                    pen.watered = true;
                    pen.lastWatered = harvestT;
                  }
                }
              }
            }
            currentPlayer.farms[gi] = pens;
          } catch (farmErr) {
            console.warn('math offline farm ' + gi, farmErr);
          }
        }
      }

      currentPlayer.activeFarm = activeFarm;
      currentPlayer.pens = currentPlayer.farms[activeFarm];
    }

    // Áp boost hết hạn / Tiên chăm lần nữa
    if (this.resetExpiredBoosts()) changed = true;

    if (rainHits) {
      let rainNote = this.isFairyActive()
        ? `Mưa ${rainHits} trận (Tiên chăm kèm)`
        : `Mưa ${rainHits} trận (buff lớn)`;
      if (rainCollected > 0) {
        rainNote += ` · Tiên nhặt ${rainCollected} vật phẩm`;
        if (rainCollectCoins) rainNote += ` (+${rainCollectCoins}🪙)`;
        if (rainCollectSeeds) rainNote += ` (+${rainCollectSeeds} con)`;
      }
      notes.push(rainNote);
    }
    if (fairyCycles) notes.push(`Tiên ${fairyCycles} lần chu kỳ 3h`);
    const uniquePensHarvested = harvestedPenKeys.size;
    if (totalHarvest || totalAnimal || nycFarmIndexes.length) {
      notes.push(
        `NYC: thu hoạch ${uniquePensHarvested} ô - ${totalYieldAmount} sản phẩm - ${totalHarvest} vụ (nuôi lại ${totalAnimal})` +
        (totalHarvest > uniquePensHarvested && uniquePensHarvested > 0
          ? ` · TB ~${(totalHarvest / Math.max(1, uniquePensHarvested)).toFixed(1)} vòng/ô`
          : '')
      );

      // Luôn liệt kê MỌI trại NYC đang bật (kể cả 0 vụ) — tránh thiếu Trại 1 trong Tóm tắt
      const noteFarmIndexes = nycFarmIndexes.length
        ? nycFarmIndexes
        : Object.keys(harvestByFarm).map(Number).filter(n => !isNaN(n)).sort((a, b) => a - b);
      noteFarmIndexes.forEach(giNum => {
        const gi = String(giNum);
        const g = harvestByFarm[gi] || {
          pens: new Set(), cycles: 0, amount: 0, raised: 0, animalIds: {}
        };
        const nPens = (g.pens && g.pens.size) || 0;
        const nCyc = g.cycles || 0;
        const nAmt = g.amount || 0;
        const nAnimal = g.raised || 0;
        const totalSlots = penCountByFarm[gi] || 0;
        const nO = nPens > 0 ? nPens : totalSlots;
        const vu = nCyc;
        const avgRing = nO > 0 && vu > 0 ? (vu / nO).toFixed(1) : '0';
        let seedName = '';
        if (g.animalIds && Object.keys(g.animalIds).length) {
          const top = Object.keys(g.animalIds).sort((a, b) => g.animalIds[b] - g.animalIds[a])[0];
          if (top) {
            const pl = this.getAnimal(top);
            seedName = (pl && pl.name) ? pl.name : top;
          }
        }
        if (!seedName) {
          try {
            const gcfg = this.getNycConfigForFarm(giNum);
            if (gcfg && gcfg.animalId) {
              const pl = this.getAnimal(gcfg.animalId);
              seedName = (pl && pl.name) ? pl.name : String(gcfg.animalId);
            }
          } catch (_) {}
        }
        let zeroHint = '';
        if (vu === 0) {
          const d = farmDiag[gi] || {};
          const multStr = 'ô x' + (d.maxMult != null ? d.maxMult : '?');
          const growStr = d.sampleGrow != null ? ('~' + Math.round(d.sampleGrow) + 's') : '?s';
          if ((d.withAnimal || 0) === 0 && (d.seedLeft || 0) <= 0) zeroHint = ' · hết con (' + multStr + ')';
          else if ((d.withAnimal || 0) === 0) zeroHint = ' · không có con / chưa nuôi được (' + multStr + ')';
          else if (d.sampleGrow != null && offlineGap > 0 && d.sampleGrow * 1000 > offlineGap)
            zeroHint = ' · chưa chín (' + growStr + ', ' + multStr + ' — cần off lâu hơn hoặc nâng tốc độ ô)';
          else if ((d.withAnimal || 0) > 0)
            zeroHint = ' · có con nhưng 0 vụ (' + growStr + ', ' + multStr + ')';
          else zeroHint = ' · 0 vụ';
        }
        const oLabel = vu === 0 && totalSlots > 0 ? ('0/' + totalSlots + ' ô') : (nO + ' ô');
        notes.push(
          `Trại ${giNum + 1}: con ${seedName || '—'} - ${oLabel} - ${vu} vụ (~${avgRing} vòng/ô) - thu ${nAmt} cái` + zeroHint
        );
      });
    }

    
    if (this.isHelperActive()) {
      const prev = currentPlayer.lastHelperBuy || 0;
      let buys = 0;
      const helperTries = Math.max(3, Math.min(48, Math.ceil(offlineGap / (15 * 60 * 1000)) + 2));
      for (let k = 0; k < helperTries; k++) {
        currentPlayer.lastHelperBuy = 0;
        if (this.tickHelperBuy(now)) {
          buys++;
          changed = true;
        } else break;
      }
      if (!buys) currentPlayer.lastHelperBuy = prev;
      else {
        helperBuys = buys;
        notes.push(`Giúp việc mua ${buys} đợt`);
      }
    }

    currentPlayer.lastSeenAt = now;
    currentPlayer.lastCatchUpAt = now;
    delete currentPlayer._needOfflineFromLog;
    delete currentPlayer._logEarliest;
    try {
      if (typeof currentUser !== 'undefined' && currentUser && currentUser.uid) {
        localStorage.removeItem('vuon_away_' + currentUser.uid);
      }
    } catch (_) {}
    if (fromLog) {
      notes.unshift('Log thao tác → bù từ ' + new Date(from).toLocaleString('vi-VN'));
    }

    const offlineMs = now - from;
    const offlineText = this.formatOfflineDuration(offlineMs);
    const fairyActive = this.isFairyActive();
    const nycActive = this.isNycActive();
    const helperActive = this.isHelperActive();

    
    const lines = [];
    lines.push('BÙ OFFLINE — vắng ' + offlineText + ' (từ ' + new Date(from).toLocaleString('vi-VN') + ' → ' + new Date(now).toLocaleString('vi-VN') + ')');
    lines.push('Tóm tắt: ' + (notes.length ? notes.join(' · ') : (changed ? 'đã cập nhật trạng thái' : 'không có thay đổi lớn')));
    lines.push('Mưa: ' + rainHits + ' trận (cố định mỗi 30 phút) · ô được Tiên chăm kèm mưa: ' + rainCareed);
    
    let cycleLeftSec = null;
    if (fairyActive) {
      const lastC = Number(currentPlayer.lastFairyCare) || 0;
      if (lastC) {
        cycleLeftSec = Math.max(0, Math.ceil((lastC + this.BOOST_MS - now) / 1000));
      }
    }
    lines.push('Tiên: ' + (fairyActive ? 'ĐANG BẬT' : 'tắt/hết hạn') + ' · chu kỳ 3 giờ đã chạy: ' + fairyCycles + ' lần · đồng hồ 3h còn: ' + (cycleLeftSec == null ? '—' : this.formatTime(cycleLeftSec)) + ' (không reset full 3h)');
    const _uniqP = harvestedPenKeys.size;
    lines.push(
      'NYC: ' + (nycActive ? 'ĐANG BẬT' : 'tắt/hết hạn') +
      ' · thu hoạch ' + _uniqP + ' ô - được ' + totalYieldAmount + ' sản phẩm - nuôi ' + totalAnimal + ' vụ' +
      (totalHarvest > _uniqP ? ' (' + totalHarvest + ' lần thu)' : '')
    );
    
    
    // Mỗi trại NYC = 1 dòng báo cáo: con - số ô - số vụ - số cái thu
    const reportFarmIndexes = nycFarmIndexes.length
      ? nycFarmIndexes
      : Object.keys(harvestByFarm).map(Number).filter(n => !isNaN(n)).sort((a, b) => a - b);
    if (reportFarmIndexes.length) {
      reportFarmIndexes.forEach(giNum => {
        const gi = String(giNum);
        const g = harvestByFarm[gi] || {
          pens: new Set(), cycles: 0, amount: 0, raised: 0, animalIds: {}, growSamples: []
        };
        const nPens = (g.pens && g.pens.size) || 0;
        const nCyc = g.cycles || 0;
        const nAmt = g.amount || 0;
        const nAnimal = g.raised || 0;
        const totalSlots = penCountByFarm[gi] || 0;
        const nVu = nCyc; // 1 lần thu hoạch = 1 vụ
        // nO = số ô thực sự thu được; nếu 0 vụ thì hiện tổng ô trại để biết quy mô
        const nO = nPens > 0 ? nPens : (totalSlots || nAnimal || 0);
        
        let seedName = '—';
        let baseRaise = '';
        let cfgSeed = '';
        try {
          const gcfg = this.getNycConfigForFarm ? this.getNycConfigForFarm(giNum) : null;
          if (gcfg && gcfg.animalId) {
            const cpl = this.getAnimal(gcfg.animalId);
            cfgSeed = (cpl && cpl.name) ? cpl.name : String(gcfg.animalId);
          }
        } catch (_) {}
        if (g.animalIds && Object.keys(g.animalIds).length) {
          const top = Object.keys(g.animalIds).sort((a, b) => g.animalIds[b] - g.animalIds[a])[0];
          if (top) {
            const pl = this.getAnimal(top);
            seedName = (pl && pl.name) ? pl.name : top;
            if (pl && pl.raiseTime) baseRaise = ' (gốc ' + Math.round(pl.raiseTime) + 's)';
          }
        } else if (cfgSeed) {
          seedName = cfgSeed;
          const cpl = this.getAnimal((this.getNycConfigForFarm(giNum) || {}).animalId);
          if (cpl && cpl.raiseTime) baseRaise = ' (gốc ' + Math.round(cpl.raiseTime) + 's)';
        }
        
        let growLabel = '';
        let avgRing = '';
        if (nO > 0 && nVu > 0) {
          avgRing = ' (~' + (nVu / nO).toFixed(1) + ' vòng/ô)';
        }
        if (g.growSamples && g.growSamples.length) {
          const avg = g.growSamples.reduce((s, x) => s + x, 0) / g.growSamples.length;
          growLabel = ' · chín ~' + Math.round(avg) + 's/vòng';
        } else if (nO > 0 && nVu > 0 && offlineMs > 0) {
          const perPen = nVu / nO;
          if (perPen > 0) {
            const est = (offlineMs / 1000) / perPen;
            growLabel = ' · chín ~' + Math.round(est) + 's/vòng (ước lượng)';
          }
        }
        // Format: Trại X: con Y - Z ô - N vụ - thu M cái
        let reason = '';
        if (nVu === 0) {
          const d = farmDiag[gi] || {};
          const growEff = d.sampleGrow != null ? Math.round(d.sampleGrow) : null;
          const mult = d.maxMult || 1;
          if (!d.cfgAnimal && seedName === '—') {
            reason = ' · chưa chọn con NYC';
          } else if ((d.withAnimal || 0) === 0 && (d.seedLeft || 0) <= 0) {
            reason = ' · hết giống, không nuôi được';
          } else if ((d.withAnimal || 0) === 0 && nAnimal === 0) {
            reason = ' · không có con / không nuôi được lúc off';
          } else if (growEff != null && offlineMs > 0 && growEff * 1000 > offlineMs && mult <= 1.01) {
            reason = ' · chưa chín (hiệu lực ~' + growEff + 's, ô x' + mult + ' — cần nâng tốc độ ô hoặc off lâu hơn)';
          } else if (growEff != null && offlineMs > 0 && growEff * 1000 > offlineMs) {
            reason = ' · chưa chín trong lúc vắng (hiệu lực ~' + growEff + 's, ô x' + mult + ')';
          } else if ((d.withAnimal || 0) > 0) {
            // Fallback rõ ràng hơn: vẫn có con nhưng không đủ thời gian chín (raisedAt mới / mult thấp / offline ngắn)
            const extra = (growEff != null)
              ? (' (hiệu lực ~' + growEff + 's, ô x' + mult + ')')
              : (mult > 1.01 ? (' (ô x' + mult + ')') : '');
            reason = ' · có con nhưng chưa tới lúc chín trong thời gian vắng' + extra;
          } else {
            reason = ' · 0 vụ trong lúc vắng';
          }
        }
        const oLabel = (nVu === 0 && totalSlots > 0)
          ? ('0/' + totalSlots + ' ô thu')
          : (nO + ' ô');
        lines.push(
          'Trại ' + (giNum + 1) + ': con ' + seedName + baseRaise +
          ' - ' + oLabel + ' - ' + nVu + ' vụ' + avgRing +
          ' - thu hoạch ' + nAmt + ' cái' +
          (nAnimal ? ' · nuôi lại ' + nAnimal : '') +
          growLabel + reason
        );
      });
    } else if (totalHarvest || totalAnimal) {
      lines.push('Chi tiết trại: không tách được theo trại');
    } else if (nycEnabledFarms > 0) {
      lines.push('Chi tiết trại: NYC bật nhưng chưa thu được (con chưa chín / hết con / thời gian vắng quá ngắn)');
    }
    lines.push(
      'Tổng quan: ' + totalPensAll + ' ô sở hữu · NYC bật ' + nycEnabledFarms + ' trại (' + pensOnNycFarms + ' ô)' +
      ' · có con đầu offline: ' + pensWithAnimalAtStart +
      ' · thu hoạch ' + _uniqP + ' ô - ' + totalYieldAmount + ' sản phẩm - ' + totalHarvest + ' vụ (nuôi lại ' + totalAnimal + ')' +
      (totalHarvest > _uniqP && _uniqP > 0 ? ' · TB ~' + (totalHarvest / _uniqP).toFixed(1) + ' vòng/ô' : '')
    );
    if (totalPensAll > 0 && _uniqP > 0 && _uniqP < pensOnNycFarms) {
      lines.push(
        'Lưu ý: chỉ tính ô thực sự được NYC thu trong lúc vắng. Trại tắt NYC / trống / chưa chín / hết con = không có trong chi tiết trên.'
      );
    }
    
    const animalDetailParts = Object.keys(harvestByAnimal).map(name => {
      const s = harvestByAnimal[name];
      return name + ' ×' + s.cycles + ' lần (' + s.amount + ' sp)';
    });
    if (animalDetailParts.length) {
      lines.push('Chi tiết thu offline: ' + animalDetailParts.join(' · '));
    } else if (!totalHarvest && !totalAnimal) {
      lines.push('Chi tiết thu offline: không thu được ô nào trong thời gian vắng');
    }
    lines.push('Giúp việc: ' + (helperActive ? 'ĐANG BẬT' : 'tắt/hết hạn') + ' · mua theo mốc kho: ' + helperBuys + ' đợt');
    if (fromLog) {
      lines.push('Có log thao tác (nuôi/chăm/cho ăn) → mốc bù lấy sớm hơn lastSeen');
    }
    // Debug multi-cycle
    try {
      const dbg = currentPlayer._offlineNycDebug || {};
      lines.push(
        'Debug NYC offline: mode=' + (dbg.mode || '?') +
        ' · canReRaise=' + (dbg.canReRaiseNow ? 'YES' : 'NO') +
        ' · offline=' + (dbg.offlineSec != null ? dbg.offlineSec + 's' : '?') +
        ' · grow~' + (dbg.sampleGrow != null ? dbg.sampleGrow + 's' : '?') +
        ' · nCycles=' + (dbg.nCycles != null ? dbg.nCycles : '?') +
        ' · mult~x' + (dbg.sampleMult != null ? dbg.sampleMult : '?') +
        ' · nycUntil=' + (dbg.nycUntilMs ? new Date(dbg.nycUntilMs).toLocaleString('vi-VN') : '?')
      );
    } catch (_) {}
    lines.push('Kết thúc bù offline · lastSeen/lastCatchUp cập nhật ' + new Date(now).toLocaleString('vi-VN'));

    
    const shouldLog =
      offlineMs >= OFFLINE_LOG_MIN_MS ||
      totalHarvest > 0 ||
      totalAnimal > 0 ||
      rainHits > 0 ||
      fairyCycles > 0 ||
      helperBuys > 0;
    if (shouldLog) {
      try {
        this.logOfflineReport({
          lines,
          offlineMs,
          offlineText,
          from,
          to: now,
          rainHits,
          rainChance,
          rainCareed,
          fairyCycles,
          totalHarvest,
          totalAnimal,
          totalYieldAmount,
          uniquePensHarvested: harvestedPenKeys.size,
          harvestByAnimal,
          helperBuys,
          fairyActive,
          nycActive,
          helperActive
        });
      } catch (logErr) {
        console.warn('logOfflineReport', logErr);
      }
    }

    return {
      ok: true,
      changed,
      notes,
      lines,
      offlineMs,
      offlineText,
      totalHarvest,
      totalAnimal,
      totalYieldAmount,
      harvestByAnimal,
      fairyCycles,
      helperBuys,
      rainHits,
      rainCareed,
      rainChance,
      fromLog: fromLog || null
    };
  },

  
  _nycAnimalOneAt(pen, cfg, raiseTimeMs, gi) {
    if (!pen || pen.animalId || !cfg || !cfg.animalId) return false;
    const kind = cfg.seedKind === 'myth' ? 'myth' : (cfg.seedKind === 'star' ? 'star' : 'normal');
    if (!currentPlayer.inventory.animals) currentPlayer.inventory.animals = {};
    if (!currentPlayer.inventory.animalsStar) currentPlayer.inventory.animalsStar = {};
    if (!currentPlayer.inventory.animalsMyth) currentPlayer.inventory.animalsMyth = {};
    const bag = kind === 'myth'
      ? currentPlayer.inventory.animalsMyth
      : (kind === 'star' ? currentPlayer.inventory.animalsStar : currentPlayer.inventory.animals);
    const animalId = cfg.animalId;
    const unlimited = this.isUnlimitedResources();
    if (!unlimited) {
      if ((bag[animalId] || 0) < 1) return false;
      bag[animalId]--;
      if (bag[animalId] <= 0) delete bag[animalId];
    }
    pen.animalId = animalId;
    pen.raisedAt = raiseTimeMs;
    pen.animalStar = kind === 'star' || kind === 'myth';
    pen.seedMyth = kind === 'myth';
    // Lưu raiseTime gốc lên ô — offline không phụ thuộc currentAnimals có load đủ động vật custom
    const anDef = this.getAnimal(animalId);
    pen.baseRaiseTime = (anDef && Number(anDef.raiseTime) > 0)
      ? Number(anDef.raiseTime)
      : (Number(pen.baseRaiseTime) > 0 ? Number(pen.baseRaiseTime) : 0);
    pen.waterCount = 0;
    pen.watered = false;
    pen.lastWatered = null;
    pen.feedId = null;
    pen.feedAt = null;
    
    if (typeof gi === 'number' && this.isFairyActiveAt(raiseTimeMs) && this.isFairyFarmEnabled(gi)) {
      pen.waterCount = 3;
      pen.watered = true;
      pen.lastWatered = raiseTimeMs;
      const fcfg = this.getFairyConfigForFarm
        ? this.getFairyConfigForFarm(gi)
        : this.getFairyConfig();
      if (fcfg && fcfg.useFeed) {
        const fid = this.takeFertFromBagForFairy(fcfg);
        if (fid) {
          pen.feedId = fid;
          pen.feedAt = raiseTimeMs;
        }
      }
    }
    currentPlayer.stats = currentPlayer.stats || {};
    currentPlayer.stats.raised = (currentPlayer.stats.raised || 0) + 1;
    return true;
  },

  
  _nycAnimalEmptiesAt(pens, cfg, t, gi) {
    if (!cfg || !cfg.animalId || !pens) return 0;
    const mode = cfg.mode === 'count' ? 'count' : 'all';
    
    const limit = mode === 'count'
      ? Math.max(1, Math.min(999, parseInt(cfg.count, 10) || 1))
      : 99999;
    let n = 0;
    for (let i = 0; i < pens.length && n < limit; i++) {
      const pen = pens[i];
      if (!pen || pen.animalId) continue;
      if (this._nycAnimalOneAt(pen, cfg, t, gi)) n++;
      else break; 
    }
    return n;
  },


  async buyProtect(protectId, qty = 1) {
    if (!currentPlayer) return { ok: false, msg: 'Chưa đăng nhập!' };
    const item = this.getProtect(protectId);
    if (!item) return { ok: false, msg: 'Không tìm thấy bảo hộ!' };
    const price = Math.max(1, Number(item.price) || 1);
    const maxAfford = Math.max(1, Math.floor((Number(currentPlayer.coins) || 0) / price));
    if (qty === 'all' || qty === 'max') {
      qty = maxAfford;
    } else {
      qty = Math.max(1, parseInt(qty, 10) || 1);
      
      if (qty > maxAfford) qty = maxAfford;
    }
    if (qty < 1) return { ok: false, msg: 'Không đủ tiền!' };
    const cost = price * qty;
    if (!this.chargeCoins(cost)) return { ok: false, msg: 'Không đủ tiền!' };
    if (!currentPlayer.inventory.protects) currentPlayer.inventory.protects = {};
    currentPlayer.inventory.protects[protectId] = (currentPlayer.inventory.protects[protectId] || 0) + qty;
    this.addActivity(this.isUnlimitedResources()
      ? `Mua ${qty} ${item.name} (unlimited)`
      : `Mua ${qty} ${item.name} (-${cost.toLocaleString()}🪙)`);
    await savePlayer();
    return { ok: true, msg: `Đã mua ${qty} ${item.name}!` };
  },

  async buyFairyPack(packId) {
    if (!currentPlayer) return { ok: false, msg: 'Chưa đăng nhập!' };
    const pack = DEFAULT_FAIRY_PACKS.find(p => p.id === packId);
    if (!pack) return { ok: false, msg: 'Gói không hợp lệ!' };
    if (!this.chargeCoins(pack.price)) return { ok: false, msg: 'Không đủ tiền!' };
    const base = Math.max((typeof nowMs==="function"?nowMs():Date.now()), currentPlayer.fairyUntil || 0);
    const wasActive = this.hasFairy();
    currentPlayer.fairyUntil = base + pack.days * 24 * 60 * 60 * 1000;
    
    if (!wasActive || !currentPlayer.lastFairyCare) {
      this.ensureFarms();
      const now = (typeof nowMs==="function"?nowMs():Date.now());
      this.forEachFarm((pens, gi) => {
        if (this.isFairyFarmEnabled(gi)) this.runFairyCare(now);
      });
      currentPlayer.lastFairyCare = now;
    }
    this.addActivity(`Mua ${pack.name} (-${pack.price}🪙)`);
    await savePlayer();
    return { ok: true, msg: `Đã kích hoạt ${pack.name}! Còn ${this.formatTime(this.fairyRemainingSec())}` };
  },

  async buyNycPack(packId) {
    if (!currentPlayer) return { ok: false, msg: 'Chưa đăng nhập!' };
    const pack = DEFAULT_NYC_PACKS.find(p => p.id === packId);
    if (!pack) return { ok: false, msg: 'Gói không hợp lệ!' };
    if (!this.chargeCoins(pack.price)) return { ok: false, msg: 'Không đủ tiền!' };
    const base = Math.max((typeof nowMs==="function"?nowMs():Date.now()), currentPlayer.nycUntil || 0);
    const wasActive = this.hasNyc();
    currentPlayer.nycUntil = base + pack.days * 24 * 60 * 60 * 1000;
    if (!wasActive || !currentPlayer.lastNycCare) {
      await this.runNycCare((typeof nowMs==="function"?nowMs():Date.now()));
    }
    this.addActivity(`Mua ${pack.name} (-${pack.price}🪙)`);
    await savePlayer();
    return { ok: true, msg: `Đã kích hoạt ${pack.name}! Còn ${this.formatTime(this.nycRemainingSec())}` };
  },

  
  hasHelper() {
    return !!(currentPlayer && currentPlayer.helperUntil && currentPlayer.helperUntil > (typeof nowMs==="function"?nowMs():Date.now()));
  },
  isHelperActive() {
    return this.hasHelper() && this.getBuffPrefs().helperEnabled !== false;
  },
  helperRemainingSec() {
    if (!this.hasHelper()) return 0;
    return Math.max(0, Math.ceil((currentPlayer.helperUntil - (typeof nowMs==="function"?nowMs():Date.now())) / 1000));
  },
  getHelperEmoji() {
    const g = (this.getHelperConfig().gender === 'male') ? 'male' : 'female';
    return g === 'male' ? '🤵' : '💁';
  },
  getHelperDisplayName() {
    const n = (this.getHelperConfig().customName || '').trim();
    return n || 'Giúp việc';
  },
  defaultHelperConfig() {
    return {
      customName: '',
      gender: 'female',
      
      rules: []
    };
  },
  getHelperConfig() {
    const def = this.defaultHelperConfig();
    if (!currentPlayer) return { ...def, rules: [] };
    if (!currentPlayer.helperConfig || typeof currentPlayer.helperConfig !== 'object') {
      currentPlayer.helperConfig = { ...def, rules: [] };
    }
    const c = currentPlayer.helperConfig;
    if (typeof c.customName !== 'string') c.customName = '';
    if (c.gender !== 'male' && c.gender !== 'female') c.gender = 'female';
    if (!Array.isArray(c.rules)) c.rules = [];
    c.rules = c.rules.filter(r => r && r.kind && r.id).map(r => ({
      kind: r.kind,
      id: String(r.id),
      minStock: Math.max(0, Math.min(9999, parseInt(r.minStock, 10) || 0)),
      buyQty: Math.max(1, Math.min(9999, parseInt(r.buyQty, 10) || 1)),
      enabled: r.enabled !== false
    }));
    return c;
  },
  setHelperConfig(cfg) {
    if (!currentPlayer) return { ok: false, msg: 'Chưa đăng nhập!' };
    const next = {
      customName: (cfg && typeof cfg.customName === 'string') ? cfg.customName.trim().slice(0, 20) : '',
      gender: cfg && cfg.gender === 'male' ? 'male' : 'female',
      rules: Array.isArray(cfg && cfg.rules) ? cfg.rules.filter(r => r && r.kind && r.id).map(r => ({
        kind: r.kind,
        id: String(r.id),
        minStock: Math.max(0, Math.min(9999, parseInt(r.minStock, 10) || 0)),
        buyQty: Math.max(1, Math.min(9999, parseInt(r.buyQty, 10) || 1)),
        enabled: r.enabled !== false
      })) : []
    };
    currentPlayer.helperConfig = next;
    return { ok: true, msg: 'Đã lưu cấu hình Người giúp việc (' + next.rules.length + ' mục)' };
  },

  
  getStockCount(kind, id) {
    if (!currentPlayer || !currentPlayer.inventory) return 0;
    const inv = currentPlayer.inventory;
    if (kind === 'seed') return (inv.animals && inv.animals[id]) || 0;
    if (kind === 'fert') return (inv.feeds && inv.feeds[id]) || 0;
    if (kind === 'protect') return (inv.protects && inv.protects[id]) || 0;
    return 0;
  },

  
  getShopUnitPrice(kind, id) {
    if (kind === 'seed') {
      const p = this.getAnimal(id);
      return p ? (p.buyPrice || 0) : 0;
    }
    if (kind === 'fert') {
      const f = this.getFeed(id);
      return f ? (f.price || 0) : 0;
    }
    if (kind === 'protect') {
      const pr = this.getProtect(id);
      return pr ? (pr.price || 0) : 0;
    }
    return 0;
  },

  getItemDisplayName(kind, id) {
    if (kind === 'seed') {
      const p = this.getAnimal(id);
      return p ? ((p.icon || '') + ' ' + p.name).trim() : id;
    }
    if (kind === 'fert') {
      const f = this.getFeed(id);
      return f ? ((f.icon || '') + ' ' + f.name).trim() : id;
    }
    if (kind === 'protect') {
      const pr = this.getProtect(id);
      return pr ? ((pr.icon || '') + ' ' + pr.name).trim() : id;
    }
    return id;
  },

  



  helperBuySilent(kind, id, qty) {
    qty = Math.max(1, Math.min(9999, parseInt(qty, 10) || 1));
    if (kind === 'seed') {
      const animal = this.getAnimal(id);
      if (!animal) return { ok: false, bought: 0, cost: 0, msg: 'Không có giống' };
      if (!this.isAnimalAvailable(animal)) return { ok: false, bought: 0, cost: 0, msg: 'Limited hết hạn' };
      const cost = animal.buyPrice * qty;
      if (!this.chargeCoins(cost)) return { ok: false, bought: 0, cost: 0, msg: 'Thiếu tiền' };
      currentPlayer.stats.spent = (currentPlayer.stats.spent || 0) + cost;
      if (!currentPlayer.inventory.animals) currentPlayer.inventory.animals = {};
      currentPlayer.inventory.animals[id] = (currentPlayer.inventory.animals[id] || 0) + qty;
      return { ok: true, bought: qty, cost, msg: animal.name };
    }
    if (kind === 'fert') {
      const fert = this.getFeed(id);
      if (!fert) return { ok: false, bought: 0, cost: 0, msg: 'Không có phân' };
      const cost = fert.price * qty;
      if (!this.chargeCoins(cost)) return { ok: false, bought: 0, cost: 0, msg: 'Thiếu tiền' };
      currentPlayer.stats.spent = (currentPlayer.stats.spent || 0) + cost;
      if (!currentPlayer.inventory.feeds) currentPlayer.inventory.feeds = {};
      currentPlayer.inventory.feeds[id] = (currentPlayer.inventory.feeds[id] || 0) + qty;
      return { ok: true, bought: qty, cost, msg: fert.name };
    }
    if (kind === 'protect') {
      const item = this.getProtect(id);
      if (!item) return { ok: false, bought: 0, cost: 0, msg: 'Không có bảo hộ' };
      const cost = item.price * qty;
      if (!this.chargeCoins(cost)) return { ok: false, bought: 0, cost: 0, msg: 'Thiếu tiền' };
      currentPlayer.stats.spent = (currentPlayer.stats.spent || 0) + cost;
      if (!currentPlayer.inventory.protects) currentPlayer.inventory.protects = {};
      currentPlayer.inventory.protects[id] = (currentPlayer.inventory.protects[id] || 0) + qty;
      return { ok: true, bought: qty, cost, msg: item.name };
    }
    return { ok: false, bought: 0, cost: 0, msg: 'Loại không hỗ trợ' };
  },

  



  tickHelperBuy(now = (typeof nowMs==="function"?nowMs():Date.now())) {
    if (!this.isHelperActive() || !currentPlayer) return false;
    const last = currentPlayer.lastHelperBuy || 0;
    if (now - last < 12000) return false; 
    const cfg = this.getHelperConfig();
    const rules = (cfg.rules || []).filter(r => r.enabled !== false);
    if (!rules.length) return false;

    let any = false;
    let totalCost = 0;
    const lines = [];
    rules.forEach(r => {
      const have = this.getStockCount(r.kind, r.id);
      if (have >= r.minStock) return;
      
      const res = this.helperBuySilent(r.kind, r.id, r.buyQty);
      if (res.ok && res.bought > 0) {
        any = true;
        totalCost += res.cost;
        lines.push(`${res.msg} x${res.bought}`);
      }
    });
    if (any) {
      currentPlayer.lastHelperBuy = now;
      const emoji = this.getHelperEmoji();
      const name = this.getHelperDisplayName();
      this.addActivity(`${emoji} ${name} mua: ${lines.slice(0, 5).join(', ')} (−${totalCost}🪙)`);
      if (typeof Features !== 'undefined' && Features.trackQuest) {
        
      }
    }
    return any;
  },

  async buyHelperPack(packId) {
    if (!currentPlayer) return { ok: false, msg: 'Chưa đăng nhập!' };
    const packs = this.getHelperPacks();
    const pack = packs.find(p => p.id === packId);
    if (!pack) return { ok: false, msg: 'Gói không hợp lệ!' };
    if (!this.chargeCoins(pack.price)) return { ok: false, msg: 'Không đủ tiền!' };
    const base = Math.max((typeof nowMs==="function"?nowMs():Date.now()), currentPlayer.helperUntil || 0);
    currentPlayer.helperUntil = base + pack.days * 24 * 60 * 60 * 1000;
    
    this.tickHelperBuy((typeof nowMs==="function"?nowMs():Date.now()));
    this.addActivity(`Mua ${pack.name} (-${pack.price}🪙)`);
    await savePlayer();
    return { ok: true, msg: `Đã kích hoạt ${pack.name}! Còn ${this.formatTime(this.helperRemainingSec())}` };
  },


  
  nycSyncWindowSec: 10,

  


  nycShouldWaitForNearReady(pens) {
    const list = pens || (currentPlayer && currentPlayer.pens) || [];
    const win = this.nycSyncWindowSec || 10;
    let ready = 0;
    let near = 0;
    for (const pen of list) {
      if (!pen || !pen.animalId || !pen.raisedAt) continue;
      if (this.isReady(pen)) {
        ready++;
        continue;
      }
      const remain = this.getRemainingSeconds(pen);
      if (remain > 0 && remain <= win) near++;
    }
    return ready > 0 && near > 0;
  },

  





  async runNycCare(now, farmIndex, pensOverride) {
    if (!currentPlayer) return false;
    now = now || (typeof nowMs === 'function' ? nowMs() : Date.now());
    const gIdx = (typeof farmIndex === 'number')
      ? farmIndex
      : (typeof currentPlayer.activeFarm === 'number' ? currentPlayer.activeFarm : 0);
    const gLabel = gIdx + 1;

    // Dùng pens của trại đích — KHÔNG đổi activeFarm (tránh UI nhảy trại)
    let pens = pensOverride;
    if (!pens) {
      if (Array.isArray(currentPlayer.farms) && currentPlayer.farms[gIdx]) {
        pens = currentPlayer.farms[gIdx];
      } else {
        pens = currentPlayer.pens;
      }
    }
    if (!Array.isArray(pens)) {
      if (pens && typeof pens === 'object') {
        const keys = Object.keys(pens).filter(k => /^\d+$/.test(k)).sort((a, b) => Number(a) - Number(b));
        pens = keys.map(k => pens[k]);
      } else {
        return false;
      }
    }

    if (this.nycShouldWaitForNearReady(pens)) {
      return false;
    }

    let harvested = 0;
    let raisedCount = 0;
    let totalAmount = 0;
    let totalXp = 0;

    for (let i = 0; i < pens.length; i++) {
      const pen = pens[i];
      if (!(pen && pen.animalId && this.isReady(pen))) continue;
      const animal = this.getAnimal(pen.animalId);
      if (!animal) continue;
      let amount = animal.yield;
      if (pen.feedId) {
        const fert = this.getFeed(pen.feedId);
        if (fert && fert.yieldBonus) amount = Math.ceil(amount * (1 + fert.yieldBonus));
      }
      if ((pen.waterCount || 0) >= 2) amount = Math.ceil(amount * 1.1);
      amount = this.applySeedYieldBonus(pen, amount);
      const hid = pen.animalId;
      this.stashHarvestProduct(hid, amount, pen);
      currentPlayer.stats.harvested = (currentPlayer.stats.harvested || 0) + amount;
      this.unlockCollection(pen.animalId);
      totalAmount += amount;
      totalXp += Math.ceil((animal.xp || 5) * this.getSeedXpMult(pen));
      pen.animalId = null;
      pen.raisedAt = null;
      pen.watered = false;
      pen.waterCount = 0;
      pen.lastWatered = null;
      pen.feedId = null;
      pen.feedAt = null;
      pen.animalStar = false;
      pen.seedMyth = false;
      harvested++;
    }
    if (harvested > 0) {
      this.addXp(totalXp);
      if (typeof Features !== 'undefined' && Features.trackQuest) Features.trackQuest('harvest', harvested);
    }

    const cfg = this.getNycConfigForFarm(gIdx);
    if (cfg.animalId) {
      const kind = cfg.seedKind === 'myth' ? 'myth' : (cfg.seedKind === 'star' ? 'star' : 'normal');
      const seeds = (currentPlayer.inventory && currentPlayer.inventory.animals) || {};
      const stars = (currentPlayer.inventory && currentPlayer.inventory.animalsStar) || {};
      const myths = (currentPlayer.inventory && currentPlayer.inventory.animalsMyth) || {};
      const have = kind === 'myth' ? (myths[cfg.animalId] || 0) : (kind === 'star' ? (stars[cfg.animalId] || 0) : (seeds[cfg.animalId] || 0));
      if (have > 0) {
        const empty = [];
        pens.forEach((p, i) => { if (!p.animalId) empty.push(i); });
        let want = cfg.mode === 'count' ? Math.min(cfg.count || 1, empty.length, have) : Math.min(empty.length, have);
        if (want > 0) {
          // raiseMultiple dùng currentPlayer.pens — tạm gắn rồi trả lại trại đang xem
          const prevActive = currentPlayer.activeFarm;
          const prevPens = currentPlayer.pens;
          currentPlayer.activeFarm = gIdx;
          currentPlayer.pens = pens;
          try {
            const res = await this.raiseMultiple(cfg.animalId, want, kind, now);
            if (res.ok) {
              const m = (res.msg || '').match(/(\d+)/);
              raisedCount = m ? parseInt(m[1], 10) : want;
            }
          } finally {
            currentPlayer.farms[gIdx] = currentPlayer.pens;
            currentPlayer.activeFarm = prevActive;
            currentPlayer.pens = (Array.isArray(currentPlayer.farms[prevActive])
              ? currentPlayer.farms[prevActive]
              : prevPens);
          }
        }
      }
    } else if (harvested > 0) {
      await savePlayer();
    }

    if (Array.isArray(currentPlayer.farms)) {
      currentPlayer.farms[gIdx] = pens;
      if ((currentPlayer.activeFarm || 0) === gIdx) {
        currentPlayer.pens = pens;
      }
    }

    if (harvested > 0 || raisedCount > 0) {
      currentPlayer.lastNycCare = now;
      this.addActivity(
        `NYC trại ${gLabel}: thu ${harvested} ô` +
        (totalAmount ? ` (${totalAmount} sp)` : '') +
        (raisedCount ? `, nuôi ${raisedCount} ô cùng giờ` : '')
      );
    }
    return harvested > 0 || raisedCount > 0;
  },

  /** Kiểm tra 1 trại có việc NYC — không đụng activeFarm */
  nycHasWorkOn(pens, gIdx) {
    if (!this.isNycActive() || !pens) return false;
    const list = Array.isArray(pens) ? pens : Object.values(pens || {});
    const win = this.nycSyncWindowSec || 10;
    for (const pen of list) {
      if (!pen || !pen.animalId || !pen.raisedAt) continue;
      if (this.isReady(pen)) return true;
      const remain = this.getRemainingSeconds(pen);
      if (remain > 0 && remain <= win) return true;
    }
    if (!this.isNycFarmEnabled(gIdx)) return false;
    const cfg = this.getNycConfigForFarm(gIdx);
    if (!cfg.animalId) return false;
    const kind = cfg.seedKind === 'myth' ? 'myth' : (cfg.seedKind === 'star' ? 'star' : 'normal');
    const seeds = (currentPlayer.inventory && currentPlayer.inventory.animals) || {};
    const stars = (currentPlayer.inventory && currentPlayer.inventory.animalsStar) || {};
    const myths = (currentPlayer.inventory && currentPlayer.inventory.animalsMyth) || {};
    const have = kind === 'myth' ? (myths[cfg.animalId] || 0) : (kind === 'star' ? (stars[cfg.animalId] || 0) : (seeds[cfg.animalId] || 0));
    if (have < 1) return false;
    return list.some(p => p && !p.animalId);
  },

  nycHasWork() {
    if (!this.isNycActive() || !currentPlayer || !currentPlayer.pens) return false;
    const gIdx = typeof currentPlayer.activeFarm === 'number' ? currentPlayer.activeFarm : 0;
    return this.nycHasWorkOn(currentPlayer.pens, gIdx);
  },

  _nycBusy: false,
  async tickNycCare() {
    if (!this.isNycActive() || this._nycBusy) return false;
    this.ensureFarms();
    this._nycBusy = true;
    let any = false;
    try {
      // Giữ nguyên trại đang xem — không gán activeFarm trong vòng lặp (tránh UI nhảy)
      const active = (typeof currentPlayer.activeFarm === 'number') ? currentPlayer.activeFarm : 0;
      this.syncActiveFarm();
      for (let i = 0; i < currentPlayer.farms.length; i++) {
        if (!this.isNycFarmEnabled(i)) continue;
        const pens = currentPlayer.farms[i];
        if (!this.nycHasWorkOn(pens, i)) continue;
        const farmNow = (typeof nowMs === 'function' ? nowMs() : Date.now());
        const did = await this.runNycCare(farmNow, i, pens);
        if (did) any = true;
      }
      currentPlayer.activeFarm = active;
      if (Array.isArray(currentPlayer.farms[active])) {
        currentPlayer.pens = currentPlayer.farms[active];
      }
      return any;
    } finally {
      this._nycBusy = false;
    }
  },

  
  getMergeBaseRate() {
    let b = 25;
    if (typeof currentSettings !== 'undefined' && currentSettings && currentSettings.mergeBaseRate != null) {
      b = Number(currentSettings.mergeBaseRate);
    }
    if (!Number.isFinite(b)) b = 25;
    return Math.max(1, Math.min(100, Math.round(b)));
  },

  



  getMergeSuccessRate(protectId) {
    let rate = this.getMergeBaseRate();
    if (protectId) {
      const protect = this.getProtect(protectId);
      if (protect && Number.isFinite(Number(protect.rate))) {
        rate += Number(protect.rate);
      }
    }
    return Math.max(1, Math.min(100, Math.round(rate)));
  },

  




  


  _binomialSample(n, p) {
    n = Math.max(0, Math.floor(n) || 0);
    if (n === 0) return 0;
    p = Math.max(0, Math.min(1, Number(p) || 0));
    if (p <= 0) return 0;
    if (p >= 1) return n;
    
    if (n <= 8000) {
      let k = 0;
      for (let i = 0; i < n; i++) if (Math.random() < p) k++;
      return k;
    }
    
    const mean = n * p;
    const sd = Math.sqrt(n * p * (1 - p)) || 0;
    let u = 0, v = 0, s = 0;
    do {
      u = Math.random() * 2 - 1;
      v = Math.random() * 2 - 1;
      s = u * u + v * v;
    } while (s === 0 || s >= 1);
    const z = u * Math.sqrt(-2 * Math.log(s) / s);
    let k = Math.round(mean + sd * z);
    if (k < 0) k = 0;
    if (k > n) k = n;
    return k;
  },


  /** normal | star | myth */
  getPenSeedTier(pen) {
    if (!pen) return 'normal';
    if (pen.seedMyth || pen.seedTier === 'myth') return 'myth';
    if (pen.animalStar || pen.seedTier === 'star') return 'star';
    return 'normal';
  },
  getSeedYieldMult(plotOrTier) {
    const t = (typeof penOrTier === 'string') ? penOrTier : this.getPenSeedTier(plotOrTier);
    if (t === 'myth') return 2;
    if (t === 'star') return 1.5;
    return 1;
  },
  getSeedXpMult(plotOrTier) {
    const t = (typeof penOrTier === 'string') ? penOrTier : this.getPenSeedTier(plotOrTier);
    if (t === 'myth') return 1.6;
    if (t === 'star') return 1.3;
    return 1;
  },
  getSeedSellMult(tier) {
    if (tier === 'myth') return 2;
    if (tier === 'star') return 1.5;
    return 1;
  },
  applySeedYieldBonus(pen, amount) {
    const m = this.getSeedYieldMult(pen);
    return m > 1 ? Math.ceil(amount * m) : amount;
  },
  stashHarvestProduct(hid, amount, pen) {
    if (!currentPlayer.inventory) currentPlayer.inventory = {};
    const tier = this.getPenSeedTier(pen);
    let bagKey = 'harvest';
    if (tier === 'myth') bagKey = 'harvestMyth';
    else if (tier === 'star') bagKey = 'harvestStar';
    if (!currentPlayer.inventory[bagKey]) currentPlayer.inventory[bagKey] = {};
    currentPlayer.inventory[bagKey][hid] = (currentPlayer.inventory[bagKey][hid] || 0) + amount;
    return tier;
  },

  async mergeSeeds(animalId, protectId, times = 1) {
    if (!currentPlayer) return { ok: false, msg: 'Chưa đăng nhập!' };
    const animal = this.getAnimal(animalId);
    if (!animal) return { ok: false, msg: 'Con không hợp lệ!' };
    if (!currentPlayer.inventory.animals) currentPlayer.inventory.animals = {};
    if (!currentPlayer.inventory.animalsStar) currentPlayer.inventory.animalsStar = {};
    if (!currentPlayer.inventory.protects) currentPlayer.inventory.protects = {};

    
    const unlimited = this.isUnlimitedResources();
    const seeds = currentPlayer.inventory.animals;
    const stars = currentPlayer.inventory.animalsStar;
    const protects = currentPlayer.inventory.protects;
    let protect = null;
    if (protectId) {
      protect = this.getProtect(protectId);
      if (!protect) return { ok: false, msg: 'Bùa bảo hộ không hợp lệ!' };
    }

    const ratePct = this.getMergeSuccessRate(protectId || null);
    const p = ratePct / 100;
    const lastRate = ratePct;

    let wantAll = (times === 'all' || times === 'max' || times === Infinity);
    let timesLeft = wantAll ? Number.MAX_SAFE_INTEGER : Math.max(1, Math.floor(Number(times) || 1));
    if (!Number.isFinite(timesLeft) || timesLeft < 1) timesLeft = 1;
    if (wantAll && unlimited) {
      
      timesLeft = 1000000;
      wantAll = false;
    }

    let success = 0;
    let fail = 0;
    let did = 0;
    let guard = 0;
    const YIELD_EVERY_BLOCKS = 1;

    while (timesLeft > 0 && guard++ < 500000) {
      let have = unlimited ? Number.MAX_SAFE_INTEGER : (seeds[animalId] || 0);
      if (!unlimited && have < 2) break;
      let ph = 0;
      if (protect && !unlimited) {
        ph = protects[protectId] || 0;
        if (ph < 1) {
          if (did === 0) return { ok: false, msg: 'Không đủ bùa bảo hộ!' };
          break;
        }
      }

      
      
      let maxBySeed = unlimited ? timesLeft : Math.floor(have / 2);
      if (protect && !unlimited) maxBySeed = Math.min(maxBySeed, ph);
      let B = Math.min(timesLeft, maxBySeed);
      if (B < 1) break;

      
      if (B > 200000) B = 200000;

      const k = this._binomialSample(B, p); 
      const f = B - k;

      if (!unlimited) {
        
        const consume = B + k;
        seeds[animalId] = have - consume;
        if (seeds[animalId] <= 0) delete seeds[animalId];
        if (protect) {
          protects[protectId] = ph - B;
          if (protects[protectId] <= 0) delete protects[protectId];
        }
      }
      if (k > 0) stars[animalId] = (stars[animalId] || 0) + k;

      success += k;
      fail += f;
      did += B;
      timesLeft -= B;

      
      if ((guard % YIELD_EVERY_BLOCKS) === 0) {
        await new Promise(r => setTimeout(r, 0));
      }
    }

    if (did === 0) return { ok: false, msg: 'Cần ít nhất 2 con thường cùng loại!' };

    if (did === 1) {
      if (success) {
        this.addActivity(`Ghép thành công ⭐ ${animal.name} (${lastRate}%)`);
        await savePlayer();
        return { ok: true, success: true, msg: `✨ Thành công! Nhận 1 con sao ${animal.name} (tỉ lệ ${lastRate}%)` };
      }
      this.addActivity(`Ghép thất bại ${animal.name} (${lastRate}%)`);
      await savePlayer();
      return { ok: true, success: false, msg: `💥 Thất bại (tỉ lệ ${lastRate}%). Mất 1 giống` + (protectId ? ' + bùa' : '') + '.' };
    }

    this.addActivity(`Ghép ×${did}: thành công ${success}, thất bại ${fail} (${animal.name}, ${lastRate}%)`);
    await savePlayer();
    return {
      ok: true,
      success: success > 0,
      msg: `Ghép ${did.toLocaleString()} lần · ✨ ${success.toLocaleString()} sao · 💥 ${fail.toLocaleString()} thất bại (tỉ lệ ${lastRate}%)`,
      did, successCount: success, failCount: fail
    };
  },


  /** Ghép 2 con sao → 1 con huyền thoại */
  async mergeMythSeeds(animalId, protectId, times = 1) {
    if (!currentPlayer) return { ok: false, msg: 'Chưa đăng nhập!' };
    const animal = this.getAnimal(animalId);
    if (!animal) return { ok: false, msg: 'Con không hợp lệ!' };
    if (!currentPlayer.inventory.animalsStar) currentPlayer.inventory.animalsStar = {};
    if (!currentPlayer.inventory.animalsMyth) currentPlayer.inventory.animalsMyth = {};
    if (!currentPlayer.inventory.protects) currentPlayer.inventory.protects = {};

    const unlimited = this.isUnlimitedResources();
    const stars = currentPlayer.inventory.animalsStar;
    const myths = currentPlayer.inventory.animalsMyth;
    const protects = currentPlayer.inventory.protects;
    let protect = null;
    if (protectId) {
      protect = this.getProtect(protectId);
      if (!protect) return { ok: false, msg: 'Bùa bảo hộ không hợp lệ!' };
    }

    // Cùng công thức bùa như ghép sao: base + protect, cap 100%
    // (Bùa 100% → chắc chắn thành công, không trừ thêm)
    let ratePct = this.getMergeSuccessRate(protectId || null);
    ratePct = Math.max(1, Math.min(100, ratePct));
    const p = ratePct / 100;
    const lastRate = ratePct;

    let wantAll = (times === 'all' || times === 'max' || times === Infinity);
    let timesLeft = wantAll ? Number.MAX_SAFE_INTEGER : Math.max(1, Math.floor(Number(times) || 1));
    if (!Number.isFinite(timesLeft) || timesLeft < 1) timesLeft = 1;
    if (wantAll && unlimited) {
      timesLeft = 1000000;
      wantAll = false;
    }

    let success = 0;
    let fail = 0;
    let did = 0;
    let guard = 0;

    while (timesLeft > 0 && guard++ < 500000) {
      let have = unlimited ? Number.MAX_SAFE_INTEGER : (stars[animalId] || 0);
      if (!unlimited && have < 2) break;
      let ph = 0;
      if (protect && !unlimited) {
        ph = protects[protectId] || 0;
        if (ph < 1) {
          if (did === 0) return { ok: false, msg: 'Không đủ bùa bảo hộ!' };
          break;
        }
      }
      let maxBySeed = unlimited ? timesLeft : Math.floor(have / 2);
      if (protect && !unlimited) maxBySeed = Math.min(maxBySeed, ph);
      let B = Math.min(timesLeft, maxBySeed);
      if (B < 1) break;
      if (B > 200000) B = 200000;

      const k = this._binomialSample(B, p);
      const f = B - k;

      if (!unlimited) {
        // Thành công: mất 2 sao/lần; thất bại: mất 1 sao/lần (giống logic ghép thường)
        const consume = B + k;
        stars[animalId] = have - consume;
        if (stars[animalId] <= 0) delete stars[animalId];
        if (protect) {
          protects[protectId] = ph - B;
          if (protects[protectId] <= 0) delete protects[protectId];
        }
      }
      if (k > 0) myths[animalId] = (myths[animalId] || 0) + k;

      success += k;
      fail += f;
      did += B;
      timesLeft -= B;
      if ((guard % 1) === 0) {
        await new Promise(r => setTimeout(r, 0));
      }
    }

    if (did === 0) return { ok: false, msg: 'Cần ít nhất 2 con sao ⭐ cùng loại để ghép huyền thoại!' };

    if (did === 1) {
      if (success) {
        this.addActivity(`Ghép huyền thoại ✨ ${animal.name} (${lastRate}%)`);
        await savePlayer();
        return { ok: true, success: true, msg: `🌌 Thành công! Nhận 1 con huyền thoại ${animal.name} (tỉ lệ ${lastRate}%)` };
      }
      this.addActivity(`Ghép huyền thoại thất bại ${animal.name} (${lastRate}%)`);
      await savePlayer();
      return { ok: true, success: false, msg: `💥 Thất bại (tỉ lệ ${lastRate}%). Mất 1 con sao` + (protectId ? ' + bùa' : '') + '.' };
    }

    this.addActivity(`Ghép huyền thoại ×${did}: thành công ${success}, thất bại ${fail} (${animal.name}, ${lastRate}%)`);
    await savePlayer();
    return {
      ok: true,
      success: success > 0,
      msg: `Huyền thoại ${did.toLocaleString()} lần · ✨ ${success.toLocaleString()} · 💥 ${fail.toLocaleString()} (tỉ lệ ${lastRate}%)`,
      did, successCount: success, failCount: fail
    };
  },

  async harvestPen(plotId) {
    if (!currentPlayer) return { ok: false, msg: 'Chưa đăng nhập!' };
    const pen = currentPlayer.pens[plotId];
    if (!pen || !pen.animalId) return { ok: false, msg: 'Không có con!' };
    if (!this.isReady(pen)) return { ok: false, msg: 'Con chưa chín!' };
    const animal = this.getAnimal(pen.animalId);
    let amount = animal.yield;
    if (pen.feedId) {
      const fert = this.getFeed(pen.feedId);
      if (fert && fert.yieldBonus) amount = Math.ceil(amount * (1 + fert.yieldBonus));
    }
    if ((pen.waterCount || 0) >= 2) amount = Math.ceil(amount * 1.1);
    amount = this.applySeedYieldBonus(pen, amount);
    const hid = pen.animalId;
    this.stashHarvestProduct(hid, amount, pen);
    currentPlayer.stats.harvested = (currentPlayer.stats.harvested || 0) + amount;
    if (typeof Features !== 'undefined') Features.trackQuest('harvest', 1);
    const newCol = this.unlockCollection(pen.animalId);
    const xpGain = Math.ceil((animal.xp || 5) * this.getSeedXpMult(pen));
    this.addXp(xpGain);
    const _ht = this.getPenSeedTier(pen);
    const _htag = _ht === 'myth' ? ' ✨' : (_ht === 'star' ? ' ⭐' : '');
    pen.animalId = null;
    pen.raisedAt = null;
    pen.watered = false;
    pen.waterCount = 0;
    pen.lastWatered = null;
    pen.feedId = null;
    pen.feedAt = null;
    pen.animalStar = false;
    pen.seedMyth = false;
    this.addActivity(`Thu hoạch ${amount} ${animal.name}${_htag} (+${xpGain} XP)` + (newCol ? ' · Album +1' : ''));
    if (typeof recordGameEvent === 'function') {
      recordGameEvent('harvest', {
        penId,
        farmIndex: currentPlayer.activeFarm || 0,
        animalId: hid,
        amount,
        at: (typeof nowMs === 'function' ? nowMs() : Date.now())
      });
    }
    const ach = this.checkAchievements();
    await savePlayer({ action: 'harvest' });
    this.notifyAchievements(ach);
    return { ok: true, msg: `Thu hoạch ${amount} ${animal.name}! +${xpGain} XP` + (newCol ? ' · Mở album!' : '') };
  },

  async harvestAll(limit) {
    if (!currentPlayer) return { ok: false, msg: 'Chưa đăng nhập!' };
    const max = (limit == null || limit === 'all') ? Infinity : Math.max(0, parseInt(limit, 10) || 0);
    let total = 0, totalXp = 0, pensDone = 0;
    for (const pen of currentPlayer.pens) {
      if (pensDone >= max) break;
      if (pen.animalId && this.isReady(pen)) {
        const animal = this.getAnimal(pen.animalId);
        let amount = animal.yield;
        if (pen.feedId) {
          const fert = this.getFeed(pen.feedId);
          if (fert && fert.yieldBonus) amount = Math.ceil(amount * (1 + fert.yieldBonus));
        }
        if ((pen.waterCount || 0) >= 2) amount = Math.ceil(amount * 1.1);
        amount = this.applySeedYieldBonus(pen, amount);
        const hid = pen.animalId;
        this.stashHarvestProduct(hid, amount, pen);
        currentPlayer.stats.harvested = (currentPlayer.stats.harvested || 0) + amount;
        this.unlockCollection(pen.animalId);
        total += amount;
        totalXp += Math.ceil((animal.xp || 5) * this.getSeedXpMult(pen));
        pen.animalId = null;
        pen.raisedAt = null;
        pen.watered = false;
        pen.waterCount = 0;
        pen.lastWatered = null;
        pen.feedId = null;
        pen.feedAt = null;
        pen.animalStar = false;
    pen.seedMyth = false;
        pensDone++;
      }
    }
    if (total > 0) {
      this.addXp(totalXp);
      this.addActivity(`Thu hoạch ${pensDone} ô: ${total} sản phẩm (+${totalXp} XP)`);
      const ach = this.checkAchievements();
      await savePlayer();
      this.notifyAchievements(ach);
    }
    return { ok: true, msg: total > 0 ? `Thu hoạch ${total} sản phẩm! +${totalXp} XP` : 'Chưa có gì chín.' };
  },

  async removeAnimal(plotId) {
    if (!currentPlayer) return { ok: false, msg: 'Chưa đăng nhập!' };
    const pen = currentPlayer.pens[plotId];
    if (!pen || !pen.animalId) return { ok: false, msg: 'Không có con!' };
    const animal = this.getAnimal(pen.animalId);
    pen.animalId = null;
    pen.raisedAt = null;
    pen.watered = false;
    pen.waterCount = 0;
    pen.lastWatered = null;
    pen.feedId = null;
    pen.feedAt = null;
    pen.animalStar = false;
    pen.seedMyth = false;
    this.addActivity(`Bán / thả ${animal ? animal.name : 'con'}`);
    await savePlayer();
    return { ok: true, msg: `Đã nhổ bỏ ${animal ? animal.name : 'con'}.` };
  },

  

  async sellFeed(fertId, qty = 1) {
    if (!currentPlayer) return { ok: false, msg: 'Chưa đăng nhập!' };
    const fert = this.getFeed(fertId);
    if (!fert) return { ok: false, msg: 'Thức ăn không hợp lệ!' };
    qty = Math.max(1, parseInt(qty, 10) || 1);
    if (!currentPlayer.inventory.feeds) currentPlayer.inventory.feeds = {};
    const have = currentPlayer.inventory.feeds[fertId] || 0;
    if (have < qty) return { ok: false, msg: 'Không đủ cám bón!' };
    const unit = Math.max(1, Math.floor((Number(fert.price) || 10) * 0.5));
    const earn = unit * qty;
    currentPlayer.inventory.feeds[fertId] -= qty;
    if (currentPlayer.inventory.feeds[fertId] <= 0) delete currentPlayer.inventory.feeds[fertId];
    currentPlayer.coins = (currentPlayer.coins || 0) + earn;
    currentPlayer.stats = currentPlayer.stats || {};
    currentPlayer.stats.earned = (currentPlayer.stats.earned || 0) + earn;
    if (typeof Features !== 'undefined' && Features.trackQuest) Features.trackQuest('earn', earn);
    this.addActivity('Bán ' + qty + ' ' + fert.name + ' (+' + earn + '🪙)');
    await savePlayer();
    return { ok: true, msg: 'Bán ' + qty + ' ' + fert.name + ', nhận ' + earn + '🪙!' };
  },

  async sellSeed(animalId, qty = 1, kind = 'normal') {
    if (!currentPlayer) return { ok: false, msg: 'Chưa đăng nhập!' };
    const animal = this.getAnimal(animalId);
    if (!animal) return { ok: false, msg: 'Con không hợp lệ!' };
    if (!currentPlayer.inventory.animals) currentPlayer.inventory.animals = {};
    if (!currentPlayer.inventory.animalsStar) currentPlayer.inventory.animalsStar = {};
    if (!currentPlayer.inventory.animalsMyth) currentPlayer.inventory.animalsMyth = {};
    qty = Math.max(1, parseInt(qty, 10) || 1);
    let soldN = 0, soldS = 0, soldM = 0, earn = 0;
    const unitNormal = Math.max(1, Math.floor((animal.buyPrice || 1) * 0.5));
    const unitStar = Math.max(1, Math.floor((animal.buyPrice || 1) * 0.75));
    const unitMyth = Math.max(1, Math.floor((animal.buyPrice || 1) * 1.2));

    if (kind === 'myth' || kind === 'all') {
      const haveM = currentPlayer.inventory.animalsMyth[animalId] || 0;
      const takeM = kind === 'all' ? haveM : Math.min(qty, haveM);
      if (takeM > 0) {
        currentPlayer.inventory.animalsMyth[animalId] -= takeM;
        if (currentPlayer.inventory.animalsMyth[animalId] <= 0) delete currentPlayer.inventory.animalsMyth[animalId];
        soldM = takeM;
        earn += unitMyth * takeM;
      }
    }
    if (kind === 'star' || kind === 'all') {
      const haveS = currentPlayer.inventory.animalsStar[animalId] || 0;
      const takeS = kind === 'all' ? haveS : Math.min(qty, haveS);
      if (takeS > 0) {
        currentPlayer.inventory.animalsStar[animalId] -= takeS;
        if (currentPlayer.inventory.animalsStar[animalId] <= 0) delete currentPlayer.inventory.animalsStar[animalId];
        soldS = takeS;
        earn += unitStar * takeS;
      }
    }
    if (kind === 'normal' || kind === 'all') {
      const haveN = currentPlayer.inventory.animals[animalId] || 0;
      const takeN = kind === 'all' ? haveN : Math.min(qty, haveN);
      if (takeN > 0) {
        currentPlayer.inventory.animals[animalId] -= takeN;
        if (currentPlayer.inventory.animals[animalId] <= 0) delete currentPlayer.inventory.animals[animalId];
        soldN = takeN;
        earn += unitNormal * takeN;
      }
    }
    if (soldN + soldS + soldM < 1) return { ok: false, msg: 'Không đủ con để bán!' };
    currentPlayer.coins += earn;
    currentPlayer.stats.earned = (currentPlayer.stats.earned || 0) + earn;
    if (typeof Features !== 'undefined') Features.trackQuest('earn', earn);
    const parts = [];
    if (soldN) parts.push(`${soldN} thường`);
    if (soldS) parts.push(`${soldS} ⭐`);
    if (soldM) parts.push(`${soldM} ✨`);
    this.addActivity(`Bán con ${animal.name} (${parts.join(', ')}) (+${earn}🪙)`);
    await savePlayer();
    return { ok: true, msg: `Bán ${parts.join(' + ')} ${animal.name}, nhận ${earn}🪙!` };
  },

  
  
  normalizeHarvestBags() {
    if (!currentPlayer || !currentPlayer.inventory) return;
    const inv = currentPlayer.inventory;
    if (!inv.harvest) inv.harvest = {};
    if (!inv.harvestStar) inv.harvestStar = {};
    if (!inv.harvestMyth) inv.harvestMyth = {};
    if (!inv.harvestBought) inv.harvestBought = {};
    if (!inv.dishes) inv.dishes = {};
    if (!inv.dishesStar) inv.dishesStar = {};
    if (!inv.dishesMyth) inv.dishesMyth = {};
    if (inv._harvestSplitDone) return;
    Object.keys(inv.harvestStar).forEach(id => {
      const star = inv.harvestStar[id] || 0;
      if (star > 0 && (inv.harvest[id] || 0) >= star) {
        inv.harvest[id] -= star;
        if (inv.harvest[id] <= 0) delete inv.harvest[id];
      }
    });
    inv._harvestSplitDone = true;
  },

  harvestBagKey(tier) {
    if (tier === 'myth') return 'harvestMyth';
    if (tier === 'star') return 'harvestStar';
    return 'harvest';
  },
  dishBagKey(tier) {
    if (tier === 'myth') return 'dishesMyth';
    if (tier === 'star') return 'dishesStar';
    return 'dishes';
  },
  getDishSellPrice(recipe, tier) {
    const base = Math.max(0, Number(recipe && recipe.sellPrice) || 0);
    return Math.ceil(base * this.getSeedSellMult(tier === 'myth' ? 'myth' : (tier === 'star' ? 'star' : 'normal')));
  },

  async sellHarvest(animalId, qty = 1, kind = 'normal') {
    if (!currentPlayer) return { ok: false, msg: 'Chưa đăng nhập!' };
    const animal = this.getAnimal(animalId);
    if (!animal) return { ok: false, msg: 'Sản phẩm không hợp lệ!' };
    qty = Math.max(1, parseInt(qty, 10) || 1);
    const bagKey = kind === 'myth' ? 'harvestMyth' : (kind === 'star' ? 'harvestStar' : (kind === 'bought' ? 'harvestBought' : 'harvest'));
    if (!currentPlayer.inventory[bagKey]) currentPlayer.inventory[bagKey] = {};
    const have = currentPlayer.inventory[bagKey][animalId] || 0;
    if (have < qty) return { ok: false, msg: 'Không đủ sản phẩm!' };
    const unit = Math.ceil(animal.sellPrice * this.getSeedSellMult(kind === 'myth' ? 'myth' : (kind === 'star' ? 'star' : 'normal')));
    const earn = unit * qty;
    if (typeof Features !== 'undefined') Features.trackQuest('earn', earn);
    currentPlayer.inventory[bagKey][animalId] -= qty;
    if (currentPlayer.inventory[bagKey][animalId] <= 0) delete currentPlayer.inventory[bagKey][animalId];
    currentPlayer.coins += earn;
    currentPlayer.stats.earned = (currentPlayer.stats.earned || 0) + earn;
    const tag = kind === 'myth' ? '✨' : (kind === 'star' ? '⭐' : (kind === 'bought' ? '🛒' : ''));
    this.addActivity(`Bán ${qty} ${animal.name}${tag} (+${earn}🪙)`);
    await savePlayer();
    return { ok: true, msg: `Bán ${qty} ${animal.name}, nhận ${earn}🪙!` };
  },

  async sellAllHarvest(kind = null) {
    if (!currentPlayer) return { ok: false, msg: 'Chưa đăng nhập!' };
    let total = 0;
    const bags = kind ? [kind] : ['harvest', 'harvestStar', 'harvestMyth', 'harvestBought'];
    bags.forEach(bk => {
      const bag = currentPlayer.inventory[bk] || {};
      Object.keys(bag).forEach(id => {
        const animal = this.getAnimal(id);
        if (!animal) return;
        const qty = bag[id] || 0;
        if (qty <= 0) return;
        const tier = bk === 'harvestMyth' ? 'myth' : (bk === 'harvestStar' ? 'star' : 'normal');
        const unit = Math.ceil(animal.sellPrice * this.getSeedSellMult(tier));
        total += unit * qty;
      });
      currentPlayer.inventory[bk] = {};
    });
    currentPlayer.coins += total;
    currentPlayer.stats.earned = (currentPlayer.stats.earned || 0) + total;
    if (total > 0) {
      this.addActivity(`Bán tất cả sản phẩm (+${total}🪙)`);
      await savePlayer();
    }
    return { ok: true, msg: total > 0 ? `Bán hết, nhận ${total}🪙!` : 'Kho trống.' };
  },

  async claimDaily() {
    if (!currentPlayer) return { ok: false, msg: 'Chưa đăng nhập!' };
    const today = (typeof gameDateString === 'function') ? gameDateString() : new Date().toDateString();
    
    const legacy = new Date().toDateString();
    if (currentPlayer.lastDaily === today || currentPlayer.lastDaily === legacy) {
      return { ok: false, msg: 'Bạn đã nhận thưởng hôm nay rồi!' };
    }
    const reward = 150 + (currentPlayer.level || 1) * 20;
    currentPlayer.coins += reward;
    currentPlayer.lastDaily = today;
    if (!currentPlayer.inventory.feeds) currentPlayer.inventory.feeds = {};
    currentPlayer.inventory.feeds['cam-thuong'] = (currentPlayer.inventory.feeds['cam-thuong'] || 0) + 2;
    this.addActivity(`Nhận thưởng hàng ngày +${reward}🪙 +2 Cám thường`);
    await savePlayer();
    return { ok: true, msg: `Nhận ${reward}🪙 và 2 Cám thường!` };
  },

  hasClaimedDaily() {
    if (!currentPlayer) return false;
    const today = (typeof gameDateString === 'function') ? gameDateString() : new Date().toDateString();
    const legacy = new Date().toDateString();
    return currentPlayer.lastDaily === today || currentPlayer.lastDaily === legacy;
  },

  emptyPenCount() {
    if (!currentPlayer || !currentPlayer.pens) return 0;
    return currentPlayer.pens.filter(p => !p.animalId).length;
  },

  
  formatOfflineDuration(ms) {
    ms = Math.max(0, Number(ms) || 0);
    const s = Math.floor(ms / 1000);
    const d = Math.floor(s / 86400);
    const h = Math.floor((s % 86400) / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    const parts = [];
    if (d) parts.push(d + ' ngày');
    if (h) parts.push(h + ' giờ');
    if (m) parts.push(m + ' phút');
    if (sec && !d) parts.push(sec + ' giây');
    return parts.length ? parts.join(' ') : '0 giây';
  },

  




  addActivity(text, meta) {
    if (!currentPlayer) return;
    if (!currentPlayer.activity) currentPlayer.activity = [];
    
    const t = (meta && typeof meta.at === 'number' && meta.at > 0)
      ? meta.at
      : ((typeof nowMs === 'function') ? nowMs() : Date.now());
    const timeStr = (typeof formatGameDateTime === 'function')
      ? formatGameDateTime(t)
      : new Date(t).toLocaleString('vi-VN');
    currentPlayer.activity.unshift({
      text: String(text || ''),
      time: timeStr,
      t: t,
      type: (meta && meta.type) ? String(meta.type) : 'note'
    });
    
    // Chỉ giữ log trong ngày GMT+7 + giới hạn số dòng
    if (typeof pruneCurrentPlayerActivity === 'function') {
      try { pruneCurrentPlayerActivity({ now: t }); } catch (_) {}
    }
    if (currentPlayer.activity.length > 120) currentPlayer.activity = currentPlayer.activity.slice(0, 120);

    
    if (typeof recordGameEvent === 'function') {
      const type = (meta && meta.type) ? String(meta.type).slice(0, 24) : 'note';
      const data = meta && typeof meta === 'object' ? { ...meta, msg: String(text || '').slice(0, 400) } : { msg: String(text || '').slice(0, 400) };
      delete data.type;
      try { recordGameEvent(type, data); } catch (_) {}
    }
  },

  
  logOfflineReport(report) {
    if (!report || !currentPlayer) return;
    let lines = Array.isArray(report.lines) ? report.lines.slice() : [];
    
    // Ưu tiên giữ dòng từng trại + tóm tắt; cho phép nhiều dòng hơn (nhiều trại)
    const MAX_OFFLINE_LINES = 40;
    if (lines.length > MAX_OFFLINE_LINES) {
      const head = lines[0];
      const rest = lines.slice(1);
      const prefer = rest.filter(l =>
        /^(Trại \d+|Tóm tắt:|NYC:|Tiên:|Mưa:|Tổng quan:|Chi tiết thu|Giúp việc:)/.test(String(l))
      );
      const other = rest.filter(l => !prefer.includes(l));
      lines = [head].concat(prefer).concat(other).slice(0, MAX_OFFLINE_LINES);
    }
    
    for (let i = lines.length - 1; i >= 0; i--) {
      this.addActivity(lines[i], {
        type: i === 0 ? 'offline' : 'offline_detail',
        offlineMs: report.offlineMs,
        idx: i
      });
    }
    
    if (typeof recordGameEvent === 'function') {
      try {
        recordGameEvent('offline_summary', {
          offlineMs: report.offlineMs,
          offlineText: report.offlineText,
          from: report.from,
          to: report.to,
          rainHits: report.rainHits,
          rainChance: report.rainChance,
          rainCareed: report.rainCareed,
          fairyCycles: report.fairyCycles,
          totalHarvest: report.totalHarvest,
          totalAnimal: report.totalAnimal,
          totalYieldAmount: report.totalYieldAmount,
          harvestByAnimal: report.harvestByAnimal || null,
          helperBuys: report.helperBuys,
          fairyActive: report.fairyActive,
          nycActive: report.nycActive,
          helperActive: report.helperActive,
          lines: lines.slice(0, 20)
        });
      } catch (_) {}
    }
  },


  totalFeedCount() {
    if (!currentPlayer || !currentPlayer.inventory.feeds) return 0;
    return Object.values(currentPlayer.inventory.feeds).reduce((a, b) => a + (b || 0), 0);
  },

  async buyPen(qty = 1) {
    if (!currentPlayer) return { ok: false, msg: 'Chưa đăng nhập!' };
    this.ensureFarms();
    const max = this.MAX_PENS_PER_FARM;
    const have = currentPlayer.pens.length;
    const room = max - have;
    if (room <= 0) {
      return { ok: false, msg: 'Trại này đã đủ ' + max + ' ô! Hãy chuyển sang trại tiếp theo.' };
    }
    qty = Math.max(1, Math.min(20, parseInt(qty, 10) || 1));
    qty = Math.min(qty, room);
    const price = (currentSettings && currentSettings.penPrice) || 500;
    const cost = price * qty;
    if (!this.chargeCoins(cost)) return { ok: false, msg: 'Không đủ tiền! Cần ' + cost + '🪙' };
    currentPlayer.stats.spent = (currentPlayer.stats.spent || 0) + cost;
    const start = currentPlayer.pens.length;
    for (let i = 0; i < qty; i++) {
      currentPlayer.pens.push({
        id: start + i,
        animalId: null,
        raisedAt: null,
        watered: false,
        waterCount: 0,
        lastWatered: null,
        feedId: null
      });
    }
    this.syncActiveFarm();
    const unlockedBefore = currentPlayer.farms.length;
    this.refreshFarmUnlocks();
    const gName = 'Trại ' + ((currentPlayer.activeFarm || 0) + 1);
    let msg = `Đã mua ${qty} chuồng trên ${gName}! (${currentPlayer.pens.length}/${max} ô)`;
    if (currentPlayer.farms.length > unlockedBefore) {
      msg += ` · Mở khóa Trại ${currentPlayer.farms.length}!`;
    }
    this.addActivity(msg + ` (-${cost}🪙)`);
    await savePlayer();
    return { ok: true, msg };
  },


  


  async buyCompanion(id) {
    const item = this.getCompanion(id);
    if (!item) return { ok: false, msg: 'Không tìm thấy thú cưng!' };
    if (!currentPlayer.companions) currentPlayer.companions = {};
    if (currentPlayer.companions[id]) return { ok: false, msg: 'Đã sở hữu!' };
    const price = Number(item.price) || 0;
    if (!this.chargeCoins(price)) return { ok: false, msg: 'Không đủ xu!' };
    currentPlayer.companions[id] = { id, boughtAt: (typeof nowMs === 'function' ? nowMs() : Date.now()) };
    if (!currentPlayer.companionId) currentPlayer.companionId = id;
    this.addActivity(this.isUnlimitedResources()
      ? 'Mua thú cưng ' + item.name + ' (unlimited)'
      : 'Mua thú cưng ' + item.name + ' (-' + price + '🪙)');
    return { ok: true, msg: 'Đã mua ' + item.name + '!' };
  },
  equipCompanion(id) {
    if (!currentPlayer) return { ok: false, msg: 'Chưa đăng nhập' };
    if (!id || id === 'none') { currentPlayer.companionId = null; return { ok: true, msg: 'Đã gỡ thú cưng' }; }
    if (!currentPlayer.companions || !currentPlayer.companions[id]) return { ok: false, msg: 'Chưa sở hữu!' };
    currentPlayer.companionId = id;
    const c = this.getCompanion(id);
    return { ok: true, msg: 'Đã gắn ' + ((c && c.name) || id) };
  },

  async buyAvatarBadge(id) {
    const item = this.getAvatarBadge(id);
    if (!item) return { ok: false, msg: 'Không tìm thấy icon badge!' };
    if (!currentPlayer.avatarBadges) currentPlayer.avatarBadges = {};
    const bid = item.id || id;
    if (currentPlayer.avatarBadges[bid]) return { ok: false, msg: 'Đã sở hữu!' };
    const price = Number(item.price) || 400;
    if (!this.chargeCoins(price)) return { ok: false, msg: 'Không đủ xu!' };
    currentPlayer.avatarBadges[bid] = {
      id: bid,
      fa: item.fa || ('fa-regular fa-' + (item.slug || bid)),
      slug: item.slug || null,
      boughtAt: (typeof nowMs === 'function' ? nowMs() : Date.now())
    };
    if (!currentPlayer.avatarBadgeId) currentPlayer.avatarBadgeId = bid;
    this.addActivity('Mua badge icon ' + item.name + (this.isUnlimitedResources() ? ' (unlimited)' : ' (-' + price + '🪙)'));
    return { ok: true, msg: 'Đã mua ' + item.name + '!' };
  },
  equipAvatarBadge(id) {
    if (!currentPlayer) return { ok: false, msg: 'Chưa đăng nhập' };
    if (!id || id === 'none') {
      currentPlayer.avatarBadgeId = null;
      return { ok: true, msg: 'Đã gỡ badge icon' };
    }
    if (!currentPlayer.avatarBadges || !currentPlayer.avatarBadges[id]) return { ok: false, msg: 'Chưa sở hữu!' };
    currentPlayer.avatarBadgeId = id;
    const b = this.getAvatarBadge(id);
    return { ok: true, msg: 'Đã gắn ' + ((b && b.name) || id) };
  },

  async buyAvatarFrame(frameId) {
    const frame = this.getAvatarFrame(frameId);
    if (!frame) return { ok: false, msg: 'Không tìm thấy khung!' };
    if (!currentPlayer.avatarFrames) currentPlayer.avatarFrames = {};
    if (currentPlayer.avatarFrames[frameId]) return { ok: false, msg: 'Bạn đã sở hữu khung này!' };
    const price = Number(frame.price) || 0;
    if (!this.chargeCoins(price)) return { ok: false, msg: 'Không đủ xu!' };
    currentPlayer.avatarFrames[frameId] = { id: frameId, boughtAt: (typeof nowMs === 'function' ? nowMs() : Date.now()) };
    if (!currentPlayer.avatarFrameId) currentPlayer.avatarFrameId = frameId;
    this.addActivity(this.isUnlimitedResources()
      ? 'Mua khung avatar ' + frame.name + ' (unlimited)'
      : 'Mua khung avatar ' + frame.name + ' (-' + price + '🪙)');
    return { ok: true, msg: 'Đã mua khung ' + frame.name + '!' };
  },

  equipAvatarFrame(frameId) {
    if (!currentPlayer) return { ok: false, msg: 'Chưa đăng nhập' };
    if (frameId === '' || frameId === 'none' || frameId == null) {
      currentPlayer.avatarFrameId = null;
      return { ok: true, msg: 'Đã gỡ khung avatar' };
    }
    if (!currentPlayer.avatarFrames || !currentPlayer.avatarFrames[frameId]) {
      return { ok: false, msg: 'Bạn chưa sở hữu khung này!' };
    }
    const frame = this.getAvatarFrame(frameId);
    currentPlayer.avatarFrameId = frameId;
    return { ok: true, msg: 'Đã gắn khung ' + ((frame && frame.name) || frameId) };
  },

  async buyPet(petId) {
    if (!currentPlayer) return { ok: false, msg: 'Chưa đăng nhập!' };
    const pet = this.getPet(petId);
    if (!pet) return { ok: false, msg: 'Không tìm thấy pet!' };
    if (!currentPlayer.pets) currentPlayer.pets = {};
    if (currentPlayer.pets[petId]) return { ok: false, msg: 'Bạn đã sở hữu pet này!' };
    if (!this.chargeCoins(pet.price)) return { ok: false, msg: 'Không đủ xu!' };
    currentPlayer.pets[petId] = { id: petId, boughtAt: (typeof nowMs==="function"?nowMs():Date.now()), active: true };
    this.addActivity(this.isUnlimitedResources()
      ? `Nhận pet ${pet.name} (unlimited)`
      : `Nhận pet ${pet.name} (-${pet.price}🪙)`);
    await savePlayer();
    return { ok: true, msg: `Đã mua ${pet.icon} ${pet.name}!` };
  },

  togglePet(petId, active) {
    if (!currentPlayer || !currentPlayer.pets || !currentPlayer.pets[petId]) return { ok: false, msg: 'Chưa có pet!' };
    currentPlayer.pets[petId].active = !!active;
    return { ok: true };
  },

  
  tryPetCoinDrop() {
    if (!currentPlayer || !currentPlayer.pets) return null;
    const active = Object.keys(currentPlayer.pets).filter(id => currentPlayer.pets[id] && currentPlayer.pets[id].active !== false);
    if (!active.length) return null;
    const id = active[Math.floor(Math.random() * active.length)];
    const pet = this.getPet(id);
    if (!pet) return null;
    if (Math.random() > (pet.coinChance || 0.008)) return null;
    const min = pet.coinMin || 1, max = pet.coinMax || 3;
    const coins = min + Math.floor(Math.random() * (max - min + 1));
    currentPlayer.coins = (currentPlayer.coins || 0) + coins;
    currentPlayer.stats.earned = (currentPlayer.stats.earned || 0) + coins;
    return { pet, coins };
  },

  
  async cookRecipe(recipeId, times = 1, tier = 'normal') {
    if (!currentPlayer) return { ok: false, msg: 'Chưa đăng nhập!' };
    const recipe = this.getRecipe(recipeId);
    if (!recipe) return { ok: false, msg: 'Không có công thức!' };
    times = Math.max(1, Math.min(99, Math.floor(Number(times) || 1)));
    tier = (tier === 'myth' || tier === 'star') ? tier : 'normal';
    this.normalizeHarvestBags();
    const inv = currentPlayer.inventory || (currentPlayer.inventory = {});
    const bagKey = this.harvestBagKey(tier);
    const dishKey = this.dishBagKey(tier);
    const harvest = inv[bagKey] || (inv[bagKey] = {});
    const tag = tier === 'myth' ? '✨' : (tier === 'star' ? '⭐' : '');

    for (const ing of recipe.ingredients) {
      const have = harvest[ing.animalId] || 0;
      const need = (ing.qty || 1) * times;
      if (have < need) {
        const pl = this.getAnimal(ing.animalId);
        return { ok: false, msg: `Thiếu ${pl ? pl.name : ing.animalId}${tag} (cần ${need}, có ${have})` };
      }
    }
    for (const ing of recipe.ingredients) {
      const need = (ing.qty || 1) * times;
      harvest[ing.animalId] = (harvest[ing.animalId] || 0) - need;
      if (harvest[ing.animalId] <= 0) delete harvest[ing.animalId];
    }
    if (!inv[dishKey]) inv[dishKey] = {};
    inv[dishKey][recipe.id] = (inv[dishKey][recipe.id] || 0) + times;
    const xpBase = (recipe.xp || 1) * times;
    const xpGain = Math.ceil(xpBase * this.getSeedXpMult(tier));
    currentPlayer.xp = (currentPlayer.xp || 0) + xpGain;
    const sellHint = this.getDishSellPrice(recipe, tier);
    this.addActivity(`Nấu ${times}× ${recipe.name}${tag}`);
    await savePlayer();
    return {
      ok: true,
      msg: `Đã nấu ${times}× ${recipe.icon || ''} ${recipe.name}${tag}! +${xpGain} XP · bán ${sellHint.toLocaleString()}🪙/món`,
      tier
    };
  },

  async sellDish(recipeId, qty = 1, tier = 'normal') {
    if (!currentPlayer) return { ok: false, msg: 'Chưa đăng nhập!' };
    const recipe = this.getRecipe(recipeId);
    if (!recipe) return { ok: false, msg: 'Không có món!' };
    tier = (tier === 'myth' || tier === 'star') ? tier : 'normal';
    this.normalizeHarvestBags();
    const dishKey = this.dishBagKey(tier);
    const bag = (currentPlayer.inventory && currentPlayer.inventory[dishKey]) || {};
    if (qty === 'all' || qty === -1) {
      qty = bag[recipeId] || 0;
    } else {
      qty = Math.max(0, Math.floor(Number(qty) || 0));
    }
    const have = bag[recipeId] || 0;
    if (qty < 1 || have < qty) return { ok: false, msg: 'Không đủ món để bán!' };
    const unit = this.getDishSellPrice(recipe, tier);
    const gain = unit * qty;
    currentPlayer.inventory[dishKey][recipeId] = have - qty;
    if (currentPlayer.inventory[dishKey][recipeId] <= 0) delete currentPlayer.inventory[dishKey][recipeId];
    currentPlayer.coins = (currentPlayer.coins || 0) + gain;
    currentPlayer.stats.earned = (currentPlayer.stats.earned || 0) + gain;
    const tag = tier === 'myth' ? '✨' : (tier === 'star' ? '⭐' : '');
    this.addActivity(`Bán ${qty}× ${recipe.name}${tag} (+${gain}🪙)`);
    await savePlayer();
    return { ok: true, msg: `Đã bán ${qty}× ${recipe.name}${tag} (+${gain.toLocaleString()}🪙)` };
  },

  async updateLeaderboard() {
    if (!currentUser || !currentPlayer) return;
    try {
      await db.ref('leaderboard/' + currentUser.uid).set({
        uid: currentUser.uid,
        name: currentPlayer.displayName || (currentPlayer.email || currentUser.email || 'Player').split('@')[0],
        avatar: currentPlayer.avatar || '',
        coins: currentPlayer.coins || 0,
        raised: (currentPlayer.stats && currentPlayer.stats.raised) || 0,
        harvested: (currentPlayer.stats && currentPlayer.stats.harvested) || 0,
        level: currentPlayer.level || 1,
        collection: this.collectionCount(),
        updatedAt: (typeof nowMs==="function"?nowMs():Date.now())
      });
    } catch (e) { console.warn('leaderboard', e); }
  }
};