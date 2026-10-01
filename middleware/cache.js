// In-memory cache store
// Each entry: { data: <value>, createdAt: <timestamp> }
const cache = {};

const TTL = 60 * 1000; // 1 minute in milliseconds

// Middleware: check cache for GET requests
// Sets X-Cache header to HIT or MISS
function cacheMiddleware(req, res, next) {
  const key = req.originalUrl;
  const entry = cache[key];

  if (entry) {
    const age = Date.now() - entry.createdAt;

    if (age < TTL) {
      // Cache HIT — data is fresh
      res.set("X-Cache", "HIT");
      return res.json(entry.data);
    }

    // Entry expired — remove it
    delete cache[key];
  }

  // Cache MISS — let the request continue to the controller
  res.set("X-Cache", "MISS");
  next();
}

// Store a value in the cache
function setCache(key, data) {
  cache[key] = {
    data,
    createdAt: Date.now(),
  };
}

// Invalidate all cache entries (called after POST/PUT/PATCH/DELETE)
function invalidateCache() {
  for (const key in cache) {
    delete cache[key];
  }
}

module.exports = { cacheMiddleware, setCache, invalidateCache };
