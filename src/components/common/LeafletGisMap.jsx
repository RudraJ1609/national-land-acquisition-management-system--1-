import React, { useEffect, useRef, useState, useMemo } from "react";
import L from "leaflet";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import * as turf from "@turf/turf";
import {
  Layers,
  Compass,
  Search,
  X,
  MapPin,
  Maximize2,
  Minimize2,
  Trash2,
  Edit3,
  Square,
  HelpCircle,
  TrendingUp,
  Activity,
  Layers as LayersIcon,
  MousePointer,
  Scissors,
  Move,
  CheckCircle2,
  AlertTriangle,
  Info,
  Ruler,
  Crosshair,
  Sliders
} from "lucide-react";

// Fix default Leaflet icon paths in Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Built-in Cadastral Survey Plots GeoJSON Data with Statutory Status
const DEFAULT_CADASTRAL_DATA = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        id: "PAR-01",
        survey_no: "142/A",
        owner_name: "Ramesh Patel",
        status: "Amber",
        village: "Sanand",
        district: "Ahmedabad",
        total_area: 1.25,
        land_type: "Agricultural (Irrigated)",
        stage: "SIA Survey & Census Active",
        solatium_pct: 100,
        estimated_val: "₹ 48.50 Lakh"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [72.568, 23.02],
            [72.572, 23.02],
            [72.572, 23.024],
            [72.568, 23.024],
            [72.568, 23.02]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "PAR-02",
        survey_no: "142/B",
        owner_name: "Suresh Bhai",
        status: "Red",
        village: "Sanand",
        district: "Ahmedabad",
        total_area: 1.4,
        land_type: "Agricultural (Non-Irrigated)",
        stage: "Section 11 Frozen (Transactions Prohibited)",
        solatium_pct: 100,
        estimated_val: "₹ 39.20 Lakh"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [72.572, 23.02],
            [72.576, 23.02],
            [72.576, 23.024],
            [72.572, 23.024],
            [72.572, 23.02]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "PAR-03",
        survey_no: "143",
        owner_name: "State Revenue Dept (Govt Land)",
        status: "Blue",
        village: "Sanand",
        district: "Ahmedabad",
        total_area: 2.1,
        land_type: "Government Waste Land / Gamtal",
        stage: "Direct Transfer to Requiring Body",
        solatium_pct: 0,
        estimated_val: "₹ 0 (Inter-dept Transfer)"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [72.568, 23.016],
            [72.572, 23.016],
            [72.572, 23.02],
            [72.568, 23.02],
            [72.568, 23.016]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "PAR-04",
        survey_no: "144/1",
        owner_name: "Kishore Kumar",
        status: "Green",
        village: "Sanand",
        district: "Ahmedabad",
        total_area: 0.95,
        land_type: "Commercial / Roadside",
        stage: "Acquired & Compensation Disbursed (Sec 23)",
        solatium_pct: 100,
        estimated_val: "₹ 62.00 Lakh"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [72.572, 23.016],
            [72.576, 23.016],
            [72.576, 23.02],
            [72.572, 23.02],
            [72.572, 23.016]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "PAR-05",
        survey_no: "145/2",
        owner_name: "Tribhovandas Foundation",
        status: "Amber",
        village: "Sanand",
        district: "Ahmedabad",
        total_area: 1.85,
        land_type: "Community Trust / Pasture",
        stage: "Section 15 Objections Under Inquiry",
        solatium_pct: 100,
        estimated_val: "₹ 55.50 Lakh"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [72.564, 23.02],
            [72.568, 23.02],
            [72.568, 23.024],
            [72.564, 23.024],
            [72.564, 23.02]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "PAR-06",
        survey_no: "146",
        owner_name: "Dineshbhai Rabari",
        status: "Green",
        village: "Sanand",
        district: "Ahmedabad",
        total_area: 2.3,
        land_type: "Agricultural (Multi-crop)",
        stage: "Possession Panchnama Executed (Sec 38)",
        solatium_pct: 100,
        estimated_val: "₹ 78.20 Lakh"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [72.564, 23.016],
            [72.568, 23.016],
            [72.568, 23.02],
            [72.564, 23.02],
            [72.564, 23.016]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "PAR-07",
        survey_no: "147/A",
        owner_name: "Bhupendra Sharma",
        status: "Amber",
        village: "Sanand",
        district: "Ahmedabad",
        total_area: 1.6,
        land_type: "Agricultural (Irrigated)",
        stage: "Joint Measurement Survey (JMS) in progress",
        solatium_pct: 100,
        estimated_val: "₹ 44.80 Lakh"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [72.560, 23.02],
            [72.564, 23.02],
            [72.564, 23.024],
            [72.560, 23.024],
            [72.560, 23.02]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "PAR-08",
        survey_no: "147/B",
        owner_name: "Western Railway Land Pool",
        status: "Blue",
        village: "Sanand",
        district: "Ahmedabad",
        total_area: 3.2,
        land_type: "Existing Railway Track / ROW",
        stage: "Railway Corridor Co-utilization MoU",
        solatium_pct: 0,
        estimated_val: "₹ 0 (Central Entity)"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [72.560, 23.016],
            [72.564, 23.016],
            [72.564, 23.02],
            [72.560, 23.02],
            [72.560, 23.016]
          ]
        ]
      }
    }
  ]
};

const STATUTORY_COLORS = {
  Green: "#10b981", // Acquired & Disbursed
  Amber: "#f59e0b", // SIA / Objection in Progress
  Red: "#ef4444",   // Sec 11 Frozen / Disputed
  Blue: "#3b82f6"   // Govt Land
};

export const LeafletGisMap = ({
  parcels = [],
  selectedParcelIds = [],
  onSelectParcel,
  activeParcel,
  onSetActiveParcel,
  showControls = true,
  height = "520px",
  interactiveSelection = true,
  filterVillage = "All",
  onParcelsIntersected = null
}) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const cadastralLayerRef = useRef(null);
  const searchedBoundaryLayerRef = useRef(null);
  const drawnItemsGroupRef = useRef(null);
  const cadastralLayersMapRef = useRef({});

  // Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Active Base Layer State (Default to Esri Satellite as primary)
  const [activeBaseLayer, setActiveBaseLayer] = useState("satellite"); // 'satellite' | 'street' | 'bhuvan' | 'dark'
  const [showLabels, setShowLabels] = useState(true);
  const [showCadastral, setShowCadastral] = useState(true);

  // Geoman Active Mode State
  const [activeDrawMode, setActiveDrawMode] = useState(null); // 'Polygon' | 'Line' | 'Rectangle' | 'Cut' | 'edit' | 'delete' | 'drag' | null
  const [bufferDistanceMeters, setBufferDistanceMeters] = useState(50);

  // Spatial Analytics State (Turf.js Client Spatial Engine)
  const [spatialStats, setSpatialStats] = useState({
    drawnAreaHa: null,
    drawnAreaSqM: null,
    drawnAreaAcres: null,
    impactedPlots: [],
    perimeterMeters: null,
    isAuthoritative: false
  });

  // Keep callback refs stable
  const onSelectParcelRef = useRef(onSelectParcel);
  onSelectParcelRef.current = onSelectParcel;
  const onSetActiveParcelRef = useRef(onSetActiveParcel);
  onSetActiveParcelRef.current = onSetActiveParcel;
  const onParcelsIntersectedRef = useRef(onParcelsIntersected);
  onParcelsIntersectedRef.current = onParcelsIntersected;

  // Calculate Spatial Intersection against all cadastral features
  const calculateSpatialIntersections = (inputGeoJson) => {
    try {
      let areaSqM = 0;
      let perimeterM = 0;
      let testGeometry = inputGeoJson;

      if (inputGeoJson.type === "Feature") {
        testGeometry = inputGeoJson.geometry;
      }

      if (testGeometry.type === "Polygon" || testGeometry.type === "MultiPolygon") {
        areaSqM = turf.area(inputGeoJson);
        const line = turf.polygonToLine(inputGeoJson);
        perimeterM = line ? turf.length(line, { units: "kilometers" }) * 1000 : 0;
      } else if (testGeometry.type === "LineString") {
        perimeterM = turf.length(inputGeoJson, { units: "kilometers" }) * 1000;
        // Auto buffer 50m for linestrings to compute affected RoW
        inputGeoJson = turf.buffer(inputGeoJson, bufferDistanceMeters / 1000, { units: "kilometers" });
        areaSqM = turf.area(inputGeoJson);
      }

      const areaHa = (areaSqM / 10000).toFixed(3);
      const areaAcres = (parseFloat(areaHa) * 2.47105).toFixed(3);

      const affected = [];
      DEFAULT_CADASTRAL_DATA.features.forEach((parcel) => {
        try {
          const doesIntersect = turf.booleanIntersects(inputGeoJson, parcel);
          if (doesIntersect) {
            let cutAreaHa = parcel.properties.total_area;
            try {
              const intersectGeom = turf.intersect(turf.featureCollection([inputGeoJson, parcel]));
              if (intersectGeom) {
                cutAreaHa = (turf.area(intersectGeom) / 10000).toFixed(3);
              }
            } catch (e) {
              // fallback
            }

            affected.push({
              id: parcel.properties.id,
              surveyNo: parcel.properties.survey_no,
              owner: parcel.properties.owner_name,
              village: parcel.properties.village,
              status: parcel.properties.status,
              totalArea: parcel.properties.total_area,
              cutArea: cutAreaHa,
              stage: parcel.properties.stage,
              estimatedVal: parcel.properties.estimated_val
            });
          }
        } catch (err) {
          // Ignore topology edge cases
        }
      });

      const stats = {
        drawnAreaHa: areaHa,
        drawnAreaSqM: areaSqM.toFixed(1),
        drawnAreaAcres: areaAcres,
        perimeterMeters: perimeterM.toFixed(1),
        impactedPlots: affected,
        isAuthoritative: false
      };

      setSpatialStats(stats);

      if (onParcelsIntersectedRef.current) {
        onParcelsIntersectedRef.current(affected, stats);
      }

      return stats;
    } catch (e) {
      console.warn("Spatial calculation error:", e);
      return null;
    }
  };

  // Initialize Leaflet Map + Geoman Controls
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Create Map Instance centered around Gujarat / Ahmedabad
    const map = L.map(mapContainerRef.current, {
      center: [23.0205, 23.0205 ? 72.568 : 72.5714],
      zoom: 15,
      zoomControl: false,
      attributionControl: false
    });

    mapInstanceRef.current = map;

    // Layer Definitions
    const streetLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19
    });

    const esriSatellite = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      { maxZoom: 19 }
    );

    const bhuvanSatellite = L.tileLayer.wms("https://bhuvan-vec1.nrsc.gov.in/bhuvan/gwc/service/wms/", {
      layers: "india3",
      format: "image/jpeg",
      transparent: false
    });

    const darkCanvas = L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 19
    });

    const esriBoundaries = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
      { maxZoom: 19 }
    );

    // Add Default Base (Esri Satellite as Primary Base Layer)
    esriSatellite.addTo(map);
    esriBoundaries.addTo(map);

    map._customLayers = {
      satellite: esriSatellite,
      street: streetLayer,
      bhuvan: bhuvanSatellite,
      dark: darkCanvas,
      labels: esriBoundaries
    };

    // Layer group for user drawings
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);
    drawnItemsGroupRef.current = drawnItems;

    // Configure Geoman Controls on Leaflet Map (Positioned on Left side: topleft)
    if (map.pm) {
      map.pm.addControls({
        position: "topleft",
        drawCircle: false,
        drawCircleMarker: false,
        drawMarker: true,
        drawPolygon: true,
        drawPolyline: true,
        drawRectangle: true,
        drawText: true,
        editMode: true,
        dragMode: true,
        cutPolygon: true,
        removalMode: true,
        rotateMode: false
      });

      // Default Path options for drawing
      map.pm.setPathOptions({
        color: "#C5A059",
        fillColor: "#C5A059",
        fillOpacity: 0.35,
        weight: 3
      });

      // Geoman Event Listeners
      map.on("pm:create", (e) => {
        const layer = e.layer;
        drawnItems.addLayer(layer);
        const geoJson = layer.toGeoJSON();
        const stats = calculateSpatialIntersections(geoJson);

        if (stats) {
          layer
            .bindPopup(`
              <div style="font-size: 12px; font-family: 'Helvetica Neue', Arial, sans-serif; min-width: 220px; line-height: 1.4;">
                <div style="font-weight: 700; font-size: 13px; color: #1B365D; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; margin-bottom: 6px;">
                  📐 User Drawn Alignment / Boundary
                </div>
                <div><b>Calculated Area:</b> ${stats.drawnAreaHa} Ha (${stats.drawnAreaAcres} Acres)</div>
                <div><b>Perimeter / Length:</b> ${stats.perimeterMeters} m</div>
                <div style="margin-top: 4px; padding: 4px; background: #fef3c7; border-radius: 3px; font-size: 11px; color: #92400e;">
                  <b>Impacted Parcels:</b> ${stats.impactedPlots.length} Plots Intersected
                </div>
                <div style="font-size: 10px; color: #64748b; margin-top: 4px;">
                  * Preview / Client Turf.js Calculation
                </div>
              </div>
            `)
            .openPopup();
        }
        setActiveDrawMode(null);
      });

      map.on("pm:remove", () => {
        // Recalculate or clear if empty
        const allLayers = drawnItems.getLayers();
        if (allLayers.length === 0) {
          setSpatialStats({
            drawnAreaHa: null,
            drawnAreaSqM: null,
            drawnAreaAcres: null,
            impactedPlots: [],
            perimeterMeters: null,
            isAuthoritative: false
          });
        } else {
          const lastLayer = allLayers[allLayers.length - 1];
          if (lastLayer) calculateSpatialIntersections(lastLayer.toGeoJSON());
        }
      });

      map.on("pm:cut", (e) => {
        const layer = e.layer;
        if (layer) calculateSpatialIntersections(layer.toGeoJSON());
      });

      map.on("pm:edit", (e) => {
        const layer = e.layer;
        if (layer) calculateSpatialIntersections(layer.toGeoJSON());
      });
    }

    // Style function for cadastral plots
    const getParcelStyle = (feature) => {
      const status = feature.properties?.status || "Amber";
      const color = STATUTORY_COLORS[status] || "#6b7280";
      return {
        color: color,
        weight: 2,
        fillColor: color,
        fillOpacity: 0.35
      };
    };

    // Load Cadastral GeoJSON Layer
    const cadastralLayer = L.geoJSON(DEFAULT_CADASTRAL_DATA, {
      style: getParcelStyle,
      onEachFeature: (feature, layer) => {
        const p = feature.properties;
        cadastralLayersMapRef.current[p.survey_no] = layer;

        layer.bindTooltip(`Plot: ${p.survey_no}`, {
          permanent: true,
          direction: "center",
          className: "cadastral-label font-bold text-[10px] text-[#1B365D]"
        });

        layer.bindPopup(`
          <div style="font-size: 12px; line-height: 1.5; font-family: 'Helvetica Neue', Arial, sans-serif; min-width: 220px;">
            <div style="font-weight: 700; font-size: 13px; color: #1B365D; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; margin-bottom: 6px;">
              Survey Plot #${p.survey_no} (${p.village})
            </div>
            <div><b>Recorded Owner:</b> ${p.owner_name}</div>
            <div><b>Total Area:</b> ${p.total_area} Ha (${(p.total_area * 2.471).toFixed(2)} Acres)</div>
            <div><b>Land Type:</b> ${p.land_type}</div>
            <div><b>Estimated Val:</b> ${p.estimated_val || "N/A"}</div>
            <div style="margin-top: 6px;">
              <b>Statutory Status:</b>
              <span style="display:inline-block; padding: 2px 6px; border-radius: 3px; font-size: 11px; font-weight: 600; background: ${
                p.status === 'Green' ? '#dcfce7; color: #15803d;' :
                p.status === 'Amber' ? '#fef3c7; color: #b45309;' :
                p.status === 'Red' ? '#fee2e2; color: #b91c1c;' :
                '#dbeafe; color: #1d4ed8;'
              }">
                ${p.stage}
              </span>
            </div>
          </div>
        `);

        layer.on("click", () => {
          if (onSetActiveParcelRef.current) {
            onSetActiveParcelRef.current({
              id: p.id,
              surveyNumber: p.survey_no,
              village: p.village,
              ownerName: p.owner_name,
              areaAcres: p.total_area,
              status: p.status,
              stage: p.stage,
              landType: p.land_type,
              estimatedVal: p.estimated_val
            });
          }
          if (onSelectParcelRef.current) {
            onSelectParcelRef.current(p.id);
          }
        });
      }
    });

    cadastralLayer.addTo(map);
    cadastralLayerRef.current = cadastralLayer;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Handle Geoman drawing button triggers from Government Toolbar
  const handleTriggerGeomanMode = (mode) => {
    const map = mapInstanceRef.current;
    if (!map || !map.pm) return;

    if (activeDrawMode === mode) {
      // Toggle off
      map.pm.disableDraw();
      map.pm.disableGlobalEditMode();
      map.pm.disableGlobalRemovalMode();
      map.pm.disableGlobalDragMode();
      setActiveDrawMode(null);
      return;
    }

    // Disable previous
    map.pm.disableDraw();
    map.pm.disableGlobalEditMode();
    map.pm.disableGlobalRemovalMode();
    map.pm.disableGlobalDragMode();

    setActiveDrawMode(mode);

    if (mode === "Polygon") {
      map.pm.enableDraw("Polygon", { snappable: true, snapDistance: 20 });
    } else if (mode === "Line") {
      map.pm.enableDraw("Line", { snappable: true, snapDistance: 20 });
    } else if (mode === "Rectangle") {
      map.pm.enableDraw("Rectangle");
    } else if (mode === "Cut") {
      map.pm.enableDraw("Cut");
    } else if (mode === "edit") {
      map.pm.toggleGlobalEditMode();
    } else if (mode === "delete") {
      map.pm.toggleGlobalRemovalMode();
    } else if (mode === "drag") {
      map.pm.toggleGlobalDragMode();
    }
  };

  // Switch Base Layers
  const switchBaseLayer = (layerKey) => {
    const map = mapInstanceRef.current;
    if (!map || !map._customLayers) return;

    // Remove existing tile layers
    ["street", "satellite", "bhuvan", "dark"].forEach((k) => {
      if (map.hasLayer(map._customLayers[k])) {
        map.removeLayer(map._customLayers[k]);
      }
    });

    if (map._customLayers[layerKey]) {
      map.addLayer(map._customLayers[layerKey]);
      setActiveBaseLayer(layerKey);
    }
  };

  // Toggle Labels & Cadastral
  const toggleLabels = () => {
    const map = mapInstanceRef.current;
    if (!map || !map._customLayers) return;
    if (showLabels) {
      map.removeLayer(map._customLayers.labels);
      setShowLabels(false);
    } else {
      map.addLayer(map._customLayers.labels);
      setShowLabels(true);
    }
  };

  const toggleCadastral = () => {
    const map = mapInstanceRef.current;
    if (!map || !cadastralLayerRef.current) return;
    if (showCadastral) {
      map.removeLayer(cadastralLayerRef.current);
      setShowCadastral(false);
    } else {
      map.addLayer(cadastralLayerRef.current);
      setShowCadastral(true);
    }
  };

  // Search Input Handler (Nominatim + Local Cadastral Plots)
  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);

    if (val.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsSearching(true);

    // 1. Local Cadastral match
    const localMatches = DEFAULT_CADASTRAL_DATA.features
      .filter(
        (f) =>
          f.properties.survey_no.toLowerCase().includes(val.toLowerCase()) ||
          f.properties.owner_name.toLowerCase().includes(val.toLowerCase()) ||
          f.properties.village.toLowerCase().includes(val.toLowerCase())
      )
      .map((item) => ({
        type: "cadastral",
        data: item,
        title: `Survey Plot #${item.properties.survey_no} (${item.properties.village})`,
        subtitle: `Owner: ${item.properties.owner_name} | Area: ${item.properties.total_area} Ha`
      }));

    // 2. Remote Nominatim search with polygon GeoJSON
    fetch(
      `https://nominatim.openstreetmap.org/search?format=json&polygon_geojson=1&countrycodes=in&q=${encodeURIComponent(
        val
      )}`
    )
      .then((res) => res.json())
      .then((apiResults) => {
        const remoteMatches = (apiResults || []).slice(0, 5).map((item) => ({
          type: "nominatim",
          data: item,
          title: item.display_name.split(",")[0],
          subtitle: item.display_name
        }));

        setSuggestions([...localMatches, ...remoteMatches]);
        setShowSuggestions(true);
        setIsSearching(false);
      })
      .catch(() => {
        setSuggestions(localMatches);
        setShowSuggestions(localMatches.length > 0);
        setIsSearching(false);
      });
  };

  // Select Suggestion
  const handleSelectSuggestion = (suggestion) => {
    const map = mapInstanceRef.current;
    if (!map) return;

    setShowSuggestions(false);
    setSearchQuery(suggestion.title);

    if (suggestion.type === "cadastral") {
      const plotData = suggestion.data;
      const targetLayer = cadastralLayersMapRef.current[plotData.properties.survey_no];
      if (targetLayer) {
        map.fitBounds(targetLayer.getBounds(), { maxZoom: 18, padding: [50, 50] });
        targetLayer.openPopup();
      }
      if (onSetActiveParcelRef.current) {
        onSetActiveParcelRef.current({
          id: plotData.properties.id,
          surveyNumber: plotData.properties.survey_no,
          village: plotData.properties.village,
          ownerName: plotData.properties.owner_name,
          areaAcres: plotData.properties.total_area,
          status: plotData.properties.status,
          stage: plotData.properties.stage,
          landType: plotData.properties.land_type,
          estimatedVal: plotData.properties.estimated_val
        });
      }
    } else if (suggestion.type === "nominatim") {
      const geoItem = suggestion.data;

      // Remove existing searched boundary if present
      if (searchedBoundaryLayerRef.current) {
        map.removeLayer(searchedBoundaryLayerRef.current);
      }

      if (geoItem.geojson) {
        const boundaryLayer = L.geoJSON(geoItem.geojson, {
          style: {
            color: "#8b5cf6",
            weight: 3,
            fillColor: "#8b5cf6",
            fillOpacity: 0.15,
            dashArray: "5, 8"
          }
        }).addTo(map);

        boundaryLayer
          .bindPopup(`
            <div style="font-size: 13px; font-family: sans-serif;">
              <b style="color: #6d28d9;">Searched Boundary:</b><br/>
              ${geoItem.display_name}
            </div>
          `)
          .openPopup();

        searchedBoundaryLayerRef.current = boundaryLayer;
        map.fitBounds(boundaryLayer.getBounds(), { padding: [40, 40] });
      } else {
        const lat = parseFloat(geoItem.lat);
        const lon = parseFloat(geoItem.lon);
        map.setView([lat, lon], 14);
      }
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setShowSuggestions(false);
    setSuggestions([]);
    if (searchedBoundaryLayerRef.current && mapInstanceRef.current) {
      mapInstanceRef.current.removeLayer(searchedBoundaryLayerRef.current);
      searchedBoundaryLayerRef.current = null;
    }
  };

  // Perform Drawing Simulation & Spatial Calculations with Turf.js
  const handleSimulateAlignment = () => {
    const map = mapInstanceRef.current;
    if (!map || !drawnItemsGroupRef.current) return;

    // Clear previous drawn items
    drawnItemsGroupRef.current.clearLayers();

    // Create a corridor line and buffer across the cadastral plots
    const corridorLine = turf.lineString([
      [72.562, 23.023],
      [72.568, 23.021],
      [72.574, 23.018]
    ]);

    const corridorBuffer = turf.buffer(corridorLine, bufferDistanceMeters / 1000, { units: "kilometers" });

    // Calculate Area
    const stats = calculateSpatialIntersections(corridorBuffer);

    // Add corridor buffer to map
    const corridorLayer = L.geoJSON(corridorBuffer, {
      style: {
        color: "#C5A059",
        weight: 2,
        fillColor: "#C5A059",
        fillOpacity: 0.25,
        dashArray: "4, 6"
      }
    }).addTo(drawnItemsGroupRef.current);

    corridorLayer
      .bindPopup(`
        <div style="font-size: 13px; font-family: sans-serif;">
          <h4 style="margin: 0 0 4px 0; color: #1B365D; font-weight: bold;">Simulated Linear Corridor (${bufferDistanceMeters}m RoW Buffer)</h4>
          <b>Corridor Area:</b> ${stats?.drawnAreaHa} Ha (${stats?.drawnAreaAcres} Acres)<br/>
          <b>Intersected Plots:</b> ${stats?.impactedPlots.length} Parcels
        </div>
      `)
      .openPopup();

    map.fitBounds(corridorLayer.getBounds(), { padding: [30, 30] });
  };

  const handleClearDrawings = () => {
    if (drawnItemsGroupRef.current) {
      drawnItemsGroupRef.current.clearLayers();
    }
    const map = mapInstanceRef.current;
    if (map && map.pm) {
      map.pm.disableDraw();
      map.pm.disableGlobalEditMode();
      map.pm.disableGlobalRemovalMode();
    }
    setActiveDrawMode(null);
    setSpatialStats({
      drawnAreaHa: null,
      drawnAreaSqM: null,
      drawnAreaAcres: null,
      impactedPlots: [],
      perimeterMeters: null,
      isAuthoritative: false
    });
  };

  // Reset View to Western DFC Gujarat Section
  const handleResetGujaratView = () => {
    const map = mapInstanceRef.current;
    if (!map) return;
    map.setView([23.0205, 72.568], 15);
  };

  return (
    <div className="isolate z-0 relative w-full rounded-md border border-gov-border overflow-hidden bg-slate-900 shadow-sm" style={{ height }}>
      {/* 🔍 Government Multi-Level Search Bar (District, Tehsil, Village, Survey No, Boundary) */}
      <div className="absolute top-3 left-14 sm:left-16 z-[1001] w-64 sm:w-80 md:w-96 max-w-[calc(100%-240px)]">
        <div className="flex items-center bg-white rounded-md shadow-lg border border-gov-border px-3 py-1.5 transition-all focus-within:ring-2 focus-within:ring-gov-navy">
          <Search className="w-4 h-4 text-slate-500 mr-2 shrink-0" />
          <input
            type="text"
            className="flex-1 bg-transparent border-none outline-none text-xs sm:text-sm text-slate-800 placeholder:text-slate-400"
            placeholder="Search Survey No, Village, Tehsil, Boundary..."
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => {
              if (suggestions.length > 0) setShowSuggestions(true);
            }}
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600 transition-colors"
              title="Clear Search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Search Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <ul className="mt-1 bg-white rounded-md shadow-xl border border-gov-border max-h-60 overflow-y-auto z-[1002] divide-y divide-slate-100">
            {suggestions.map((item, idx) => (
              <li
                key={idx}
                onClick={() => handleSelectSuggestion(item)}
                className="p-2.5 text-xs hover:bg-slate-50 cursor-pointer flex flex-col transition-colors"
              >
                <div className="font-semibold text-gov-navy flex items-center gap-1.5">
                  {item.type === "cadastral" ? "📑" : "📍"} {item.title}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 truncate">{item.subtitle}</div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 🛠️ Geoman & Spatial Drawing Toolbar (Top Left Floating Ribbon, offset from vertical toolbar) */}
      <div className="absolute top-14 left-14 sm:left-16 z-[1000] flex flex-wrap sm:flex-nowrap items-center gap-1 bg-white/95 backdrop-blur-md p-1.5 rounded-md shadow-lg border border-gov-border text-xs">
        <span className="text-[10px] uppercase font-bold text-gov-navy px-1 hidden sm:inline">Tools:</span>
        
        <button
          onClick={() => handleTriggerGeomanMode("Polygon")}
          className={`px-2 py-1 rounded text-[11px] font-semibold flex items-center gap-1 transition-all ${
            activeDrawMode === "Polygon"
              ? "bg-gov-navy text-white shadow-xs"
              : "bg-slate-100 hover:bg-slate-200 text-slate-700"
          }`}
          title="Draw Custom Polygon Boundary (Geoman)"
        >
          <Square className="w-3.5 h-3.5 text-amber-500" />
          <span>Polygon</span>
        </button>

        <button
          onClick={() => handleTriggerGeomanMode("Line")}
          className={`px-2 py-1 rounded text-[11px] font-semibold flex items-center gap-1 transition-all ${
            activeDrawMode === "Line"
              ? "bg-gov-navy text-white shadow-xs"
              : "bg-slate-100 hover:bg-slate-200 text-slate-700"
          }`}
          title="Draw Linear RoW Alignment (Geoman)"
        >
          <Ruler className="w-3.5 h-3.5 text-blue-500" />
          <span>Line / Corridor</span>
        </button>

        <button
          onClick={() => handleTriggerGeomanMode("Rectangle")}
          className={`px-2 py-1 rounded text-[11px] font-semibold flex items-center gap-1 transition-all ${
            activeDrawMode === "Rectangle"
              ? "bg-gov-navy text-white shadow-xs"
              : "bg-slate-100 hover:bg-slate-200 text-slate-700"
          }`}
          title="Box / Rectangle Area Select"
        >
          <Square className="w-3.5 h-3.5 text-emerald-500" />
          <span className="hidden sm:inline">Rectangle</span>
        </button>

        <button
          onClick={() => handleTriggerGeomanMode("Cut")}
          className={`px-2 py-1 rounded text-[11px] font-semibold flex items-center gap-1 transition-all ${
            activeDrawMode === "Cut"
              ? "bg-amber-600 text-white shadow-xs"
              : "bg-slate-100 hover:bg-slate-200 text-slate-700"
          }`}
          title="Cut / Sub-divide Cadastral Polygon (Geoman)"
        >
          <Scissors className="w-3.5 h-3.5 text-amber-600" />
          <span className="hidden md:inline">Cut</span>
        </button>

        <button
          onClick={() => handleTriggerGeomanMode("edit")}
          className={`px-2 py-1 rounded text-[11px] font-semibold flex items-center gap-1 transition-all ${
            activeDrawMode === "edit"
              ? "bg-purple-700 text-white shadow-xs"
              : "bg-slate-100 hover:bg-slate-200 text-slate-700"
          }`}
          title="Toggle Vertex Edit Mode"
        >
          <Edit3 className="w-3.5 h-3.5 text-purple-600" />
          <span className="hidden md:inline">Edit</span>
        </button>

        <button
          onClick={() => handleTriggerGeomanMode("delete")}
          className={`px-2 py-1 rounded text-[11px] font-semibold flex items-center gap-1 transition-all ${
            activeDrawMode === "delete"
              ? "bg-red-600 text-white shadow-xs"
              : "bg-slate-100 hover:bg-slate-200 text-slate-700"
          }`}
          title="Delete Drawn Geometry"
        >
          <Trash2 className="w-3.5 h-3.5 text-red-500" />
        </button>

        <div className="h-4 w-px bg-slate-300 mx-0.5"></div>

        <button
          onClick={handleSimulateAlignment}
          className="bg-gov-accent hover:bg-amber-600 text-slate-900 px-2 py-1 rounded text-[11px] font-bold flex items-center gap-1 transition-colors shadow-xs"
          title="Auto Generate 50m RoW Buffer Corridor"
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Simulate Corridor</span>
        </button>

        <button
          onClick={handleResetGujaratView}
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-1 rounded transition-colors"
          title="Reset View to Cadastral Plots"
        >
          <Crosshair className="w-3.5 h-3.5 text-slate-600" />
        </button>
      </div>

      {/* 📊 Spatial Calculation Output Card (Turf.js Client Result vs Server Verified) */}
      {spatialStats.drawnAreaHa && (
        <div className="absolute bottom-4 left-3 z-[1000] bg-white/95 backdrop-blur-md p-3 rounded-md shadow-2xl border border-gov-border w-80 sm:w-96 text-xs transition-all max-h-72 overflow-y-auto">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-2">
            <div className="font-bold text-gov-navy flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-gov-accent" />
              Turf.js Spatial Summary
            </div>
            <div className="flex items-center gap-1">
              <span className="bg-amber-100 text-amber-800 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border border-amber-300">
                Preview / Client Calculation
              </span>
              <button
                onClick={handleClearDrawings}
                className="p-1 text-slate-400 hover:text-red-600 rounded transition-colors"
                title="Clear Overlay"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2 rounded border border-slate-200">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">Calculated Area</span>
                <span className="font-bold text-gov-navy text-xs">
                  {spatialStats.drawnAreaHa} Ha ({spatialStats.drawnAreaAcres} Ac)
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">Perimeter / Length</span>
                <span className="font-bold text-slate-800 text-xs">
                  {spatialStats.perimeterMeters} m
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center text-slate-700 pt-1">
              <span className="font-semibold text-[11px]">Intersected Cadastral Parcels:</span>
              <span className="font-bold text-gov-navy bg-amber-50 px-2 py-0.5 rounded border border-amber-200 text-xs">
                {spatialStats.impactedPlots.length} Plots
              </span>
            </div>

            {spatialStats.impactedPlots.length > 0 ? (
              <div className="max-h-28 overflow-y-auto divide-y divide-slate-100 border border-slate-200 rounded text-[11px] bg-white">
                {spatialStats.impactedPlots.map((p, i) => (
                  <div key={i} className="p-1.5 flex justify-between items-center hover:bg-slate-50">
                    <div>
                      <div className="font-bold text-slate-900 flex items-center gap-1">
                        <span>Plot #{p.surveyNo}</span>
                        <span className={`w-2 h-2 rounded-full ${
                          p.status === "Green" ? "bg-emerald-500" :
                          p.status === "Red" ? "bg-red-500" :
                          p.status === "Blue" ? "bg-blue-500" : "bg-amber-500"
                        }`}></span>
                      </div>
                      <div className="text-[10px] text-slate-500">{p.owner} ({p.village})</div>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-gov-navy text-[11px]">{p.cutArea} Ha Cut</span>
                      <div className="text-[9px] text-slate-500">{p.estimatedVal}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-slate-500 text-[11px] p-2 bg-slate-50 rounded text-center">
                No cadastral plots intersected within drawn boundary.
              </div>
            )}

            <div className="text-[10px] text-slate-500 pt-1 flex items-center gap-1">
              <Info className="w-3 h-3 text-gov-navy shrink-0" />
              <span>Authoritative PostGIS server verification will freeze these bounds for Section 11 gazette.</span>
            </div>
          </div>
        </div>
      )}

      {/* Map Layer Switcher (Top Right) */}
      <div className="absolute top-3 right-3 z-[1000] flex flex-col gap-1.5">
        <div className="bg-white/95 backdrop-blur-sm rounded-md shadow-md border border-gov-border p-1.5 flex flex-col gap-1 text-[11px]">
          <div className="font-bold text-gov-navy text-[10px] uppercase tracking-wider px-1 mb-0.5 flex items-center gap-1">
            <LayersIcon className="w-3 h-3 text-gov-accent" /> Base Map
          </div>
          <button
            onClick={() => switchBaseLayer("street")}
            className={`px-2 py-1 rounded text-left transition-colors font-medium ${
              activeBaseLayer === "street" ? "bg-gov-navy text-white font-bold" : "hover:bg-slate-100 text-slate-700"
            }`}
          >
            🗺️ OpenStreetMap
          </button>
          <button
            onClick={() => switchBaseLayer("satellite")}
            className={`px-2 py-1 rounded text-left transition-colors font-medium ${
              activeBaseLayer === "satellite" ? "bg-gov-navy text-white font-bold" : "hover:bg-slate-100 text-slate-700"
            }`}
          >
            🛰️ Esri Satellite
          </button>
          <button
            onClick={() => switchBaseLayer("bhuvan")}
            className={`px-2 py-1 rounded text-left transition-colors font-medium ${
              activeBaseLayer === "bhuvan" ? "bg-gov-navy text-white font-bold" : "hover:bg-slate-100 text-slate-700"
            }`}
          >
            🇮🇳 ISRO Bhuvan
          </button>
          <button
            onClick={() => switchBaseLayer("dark")}
            className={`px-2 py-1 rounded text-left transition-colors font-medium ${
              activeBaseLayer === "dark" ? "bg-gov-navy text-white font-bold" : "hover:bg-slate-100 text-slate-700"
            }`}
          >
            🌙 Dark Canvas
          </button>

          <div className="border-t border-slate-200 mt-1 pt-1 flex flex-col gap-1">
            <button
              onClick={toggleCadastral}
              className={`px-2 py-1 rounded text-left text-[10px] font-semibold transition-colors flex items-center justify-between ${
                showCadastral ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-slate-100 text-slate-500"
              }`}
            >
              <span>📑 Cadastral (7/12)</span>
              <span>{showCadastral ? "ON" : "OFF"}</span>
            </button>
            <button
              onClick={toggleLabels}
              className={`px-2 py-1 rounded text-left text-[10px] font-semibold transition-colors flex items-center justify-between ${
                showLabels ? "bg-blue-50 text-blue-800 border border-blue-200" : "bg-slate-100 text-slate-500"
              }`}
            >
              <span>🏷️ Admin Labels</span>
              <span>{showLabels ? "ON" : "OFF"}</span>
            </button>
          </div>
        </div>

        {/* Legend Overlay */}
        <div className="bg-white/95 backdrop-blur-sm rounded-md shadow-md border border-gov-border p-2 text-[10px] text-slate-700 space-y-1">
          <div className="font-bold text-gov-navy text-[9px] uppercase tracking-wider mb-1">Plot Status</div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
            <span>Sec 23 Acquired</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0"></span>
            <span>SIA / Hearing</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0"></span>
            <span>Sec 11 Frozen</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0"></span>
            <span>Govt / Waste Land</span>
          </div>
        </div>
      </div>

      {/* Map Canvas DOM */}
      <div ref={mapContainerRef} className="w-full h-full" style={{ minHeight: height }} />
    </div>
  );
};
