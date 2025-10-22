const express = require('express');
const cors = require('cors');
const {v4: uuidv4} = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// Store geofences in memory (replace with database in production)
const geofences = [];

// Middleware
app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({status: 'ok', timestamp: new Date().toISOString()});
});

// POST endpoint to receive geofence data
app.post('/geofence', (req, res) => {
  try {
    const {coordinates, name, timestamp} = req.body;

    // Validate request
    if (!coordinates || !Array.isArray(coordinates) || coordinates.length < 3) {
      return res.status(400).json({
        error: 'Invalid geofence data',
        message: 'Coordinates must be an array with at least 3 points',
      });
    }

    // Validate each coordinate
    const isValidCoordinates = coordinates.every(
      coord =>
        coord &&
        typeof coord.latitude === 'number' &&
        typeof coord.longitude === 'number' &&
        coord.latitude >= -90 &&
        coord.latitude <= 90 &&
        coord.longitude >= -180 &&
        coord.longitude <= 180,
    );

    if (!isValidCoordinates) {
      return res.status(400).json({
        error: 'Invalid coordinates',
        message: 'Each coordinate must have valid latitude and longitude',
      });
    }

    // Create geofence record
    const geofence = {
      id: uuidv4(),
      name: name || `Geofence_${Date.now()}`,
      coordinates,
      timestamp: timestamp || new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    geofences.push(geofence);

    console.log(`Geofence created: ${geofence.id}`);
    console.log(`  - Name: ${geofence.name}`);
    console.log(`  - Points: ${coordinates.length}`);
    console.log(`  - Coordinates: ${JSON.stringify(coordinates, null, 2)}`);

    res.status(201).json({
      id: geofence.id,
      message: 'Geofence created successfully',
      data: geofence,
    });
  } catch (error) {
    console.error('Error processing geofence:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    });
  }
});

// GET endpoint to retrieve all geofences
app.get('/geofences', (req, res) => {
  res.json({
    count: geofences.length,
    geofences,
  });
});

// GET endpoint to retrieve a specific geofence
app.get('/geofence/:id', (req, res) => {
  const geofence = geofences.find(g => g.id === req.params.id);

  if (!geofence) {
    return res.status(404).json({
      error: 'Not found',
      message: 'Geofence not found',
    });
  }

  res.json(geofence);
});

// DELETE endpoint to remove a geofence
app.delete('/geofence/:id', (req, res) => {
  const index = geofences.findIndex(g => g.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({
      error: 'Not found',
      message: 'Geofence not found',
    });
  }

  const deleted = geofences.splice(index, 1)[0];
  console.log(`Geofence deleted: ${deleted.id}`);

  res.json({
    message: 'Geofence deleted successfully',
    data: deleted,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Geofence server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`📍 POST geofence: http://localhost:${PORT}/geofence`);
  console.log(`📍 GET geofences: http://localhost:${PORT}/geofences`);
});
