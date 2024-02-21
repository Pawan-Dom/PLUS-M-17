import {
  isPlatformServer
} from "./chunk-LB2JYOT4.js";
import {
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Injectable,
  InjectionToken,
  Input,
  LOCALE_ID,
  NgModule,
  NgZone,
  Optional,
  Output,
  PLATFORM_ID,
  QueryList,
  Self,
  forwardRef,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-N2R53RNT.js";
import {
  bindCallback,
  fromEventPattern,
  merge
} from "./chunk-SQRX3OJF.js";
import "./chunk-2O3QRT26.js";
import {
  BehaviorSubject,
  Observable,
  ReplaySubject,
  Subject,
  __awaiter,
  distinctUntilChanged,
  flatMap,
  from,
  map,
  multicast,
  of,
  sample,
  shareReplay,
  skip,
  startWith,
  switchMap,
  takeUntil,
  throwError,
  timer
} from "./chunk-RD55HOQV.js";
import "./chunk-ASLTLD6L.js";

// node_modules/@agm/core/fesm2015/agm-core.js
var MapsAPILoader = class {
};
MapsAPILoader.decorators = [
  { type: Injectable }
];
var GoogleMapsAPIWrapper = class {
  constructor(_loader, _zone) {
    this._loader = _loader;
    this._zone = _zone;
    this._map = new Promise((resolve) => {
      this._mapResolver = resolve;
    });
  }
  createMap(el, mapOptions) {
    return this._zone.runOutsideAngular(() => {
      return this._loader.load().then(() => {
        const map2 = new google.maps.Map(el, mapOptions);
        this._mapResolver(map2);
        return;
      });
    });
  }
  setMapOptions(options) {
    return this._zone.runOutsideAngular(() => {
      this._map.then((m) => {
        m.setOptions(options);
      });
    });
  }
  /**
   * Creates a google map marker with the map context
   */
  createMarker(options = {}, addToMap = true) {
    return this._zone.runOutsideAngular(() => {
      return this._map.then((map2) => {
        if (addToMap) {
          options.map = map2;
        }
        return new google.maps.Marker(options);
      });
    });
  }
  createInfoWindow(options) {
    return this._zone.runOutsideAngular(() => {
      return this._map.then(() => new google.maps.InfoWindow(options));
    });
  }
  /**
   * Creates a google.map.Circle for the current map.
   */
  createCircle(options) {
    return this._zone.runOutsideAngular(() => {
      return this._map.then((map2) => {
        options.map = map2;
        return new google.maps.Circle(options);
      });
    });
  }
  /**
   * Creates a google.map.Rectangle for the current map.
   */
  createRectangle(options) {
    return this._zone.runOutsideAngular(() => {
      return this._map.then((map2) => {
        options.map = map2;
        return new google.maps.Rectangle(options);
      });
    });
  }
  createPolyline(options) {
    return this._zone.runOutsideAngular(() => {
      return this.getNativeMap().then((map2) => {
        const line = new google.maps.Polyline(options);
        line.setMap(map2);
        return line;
      });
    });
  }
  createPolygon(options) {
    return this._zone.runOutsideAngular(() => {
      return this.getNativeMap().then((map2) => {
        const polygon = new google.maps.Polygon(options);
        polygon.setMap(map2);
        return polygon;
      });
    });
  }
  /**
   * Creates a new google.map.Data layer for the current map
   */
  createDataLayer(options) {
    return this._zone.runOutsideAngular(() => {
      return this._map.then((m) => {
        const data = new google.maps.Data(options);
        data.setMap(m);
        return data;
      });
    });
  }
  /**
   * Creates a TransitLayer instance for a map
   * @returns a new transit layer object
   */
  createTransitLayer() {
    return this._zone.runOutsideAngular(() => {
      return this._map.then((map2) => {
        const newLayer = new google.maps.TransitLayer();
        newLayer.setMap(map2);
        return newLayer;
      });
    });
  }
  /**
   * Creates a BicyclingLayer instance for a map
   * @returns a new bicycling layer object
   */
  createBicyclingLayer() {
    return this._zone.runOutsideAngular(() => {
      return this._map.then((map2) => {
        const newLayer = new google.maps.BicyclingLayer();
        newLayer.setMap(map2);
        return newLayer;
      });
    });
  }
  /**
   * Determines if given coordinates are insite a Polygon path.
   */
  containsLocation(latLng, polygon) {
    return this._map.then(() => google.maps.geometry.poly.containsLocation(latLng, polygon));
  }
  subscribeToMapEvent(eventName) {
    return new Observable((observer) => {
      this._map.then((m) => m.addListener(eventName, () => this._zone.run(() => observer.next(arguments[0]))));
    });
  }
  clearInstanceListeners() {
    return this._zone.runOutsideAngular(() => {
      this._map.then((map2) => {
        google.maps.event.clearInstanceListeners(map2);
      });
    });
  }
  setCenter(latLng) {
    return this._zone.runOutsideAngular(() => {
      return this._map.then((map2) => map2.setCenter(latLng));
    });
  }
  getZoom() {
    return this._zone.runOutsideAngular(() => {
      return this._map.then((map2) => map2.getZoom());
    });
  }
  getBounds() {
    return this._zone.runOutsideAngular(() => {
      return this._map.then((map2) => map2.getBounds());
    });
  }
  getMapTypeId() {
    return this._zone.runOutsideAngular(() => {
      return this._map.then((map2) => map2.getMapTypeId());
    });
  }
  setZoom(zoom) {
    return this._zone.runOutsideAngular(() => {
      return this._map.then((map2) => map2.setZoom(zoom));
    });
  }
  getCenter() {
    return this._zone.runOutsideAngular(() => {
      return this._map.then((map2) => map2.getCenter());
    });
  }
  panTo(latLng) {
    return this._zone.runOutsideAngular(() => {
      return this._map.then((map2) => map2.panTo(latLng));
    });
  }
  panBy(x, y) {
    return this._zone.runOutsideAngular(() => {
      return this._map.then((map2) => map2.panBy(x, y));
    });
  }
  fitBounds(latLng, padding) {
    return this._zone.runOutsideAngular(() => {
      return this._map.then((map2) => map2.fitBounds(latLng, padding));
    });
  }
  panToBounds(latLng, padding) {
    return this._zone.runOutsideAngular(() => {
      return this._map.then((map2) => map2.panToBounds(latLng, padding));
    });
  }
  /**
   * Returns the native Google Maps Map instance. Be careful when using this instance directly.
   */
  getNativeMap() {
    return this._map;
  }
  /**
   * Triggers the given event name on the map instance.
   */
  triggerMapEvent(eventName) {
    return this._map.then((m) => google.maps.event.trigger(m, eventName));
  }
};
GoogleMapsAPIWrapper.decorators = [
  { type: Injectable }
];
GoogleMapsAPIWrapper.ctorParameters = () => [
  { type: MapsAPILoader },
  { type: NgZone }
];
var CircleManager = class {
  constructor(_apiWrapper, _zone) {
    this._apiWrapper = _apiWrapper;
    this._zone = _zone;
    this._circles = /* @__PURE__ */ new Map();
  }
  addCircle(circle) {
    this._apiWrapper.getNativeMap().then(() => this._circles.set(circle, this._apiWrapper.createCircle({
      center: { lat: circle.latitude, lng: circle.longitude },
      clickable: circle.clickable,
      draggable: circle.draggable,
      editable: circle.editable,
      fillColor: circle.fillColor,
      fillOpacity: circle.fillOpacity,
      radius: circle.radius,
      strokeColor: circle.strokeColor,
      strokeOpacity: circle.strokeOpacity,
      strokePosition: google.maps.StrokePosition[circle.strokePosition],
      strokeWeight: circle.strokeWeight,
      visible: circle.visible,
      zIndex: circle.zIndex
    })));
  }
  /**
   * Removes the given circle from the map.
   */
  removeCircle(circle) {
    return this._circles.get(circle).then((c) => {
      c.setMap(null);
      this._circles.delete(circle);
    });
  }
  setOptions(circle, options) {
    return __awaiter(this, void 0, void 0, function* () {
      return this._circles.get(circle).then((c) => {
        const actualParam = options.strokePosition;
        options.strokePosition = google.maps.StrokePosition[actualParam];
        c.setOptions(options);
      });
    });
  }
  getBounds(circle) {
    return this._circles.get(circle).then((c) => c.getBounds());
  }
  getCenter(circle) {
    return this._circles.get(circle).then((c) => c.getCenter());
  }
  getRadius(circle) {
    return this._circles.get(circle).then((c) => c.getRadius());
  }
  setCenter(circle) {
    return this._circles.get(circle).then((c) => c.setCenter({ lat: circle.latitude, lng: circle.longitude }));
  }
  setEditable(circle) {
    return this._circles.get(circle).then((c) => c.setEditable(circle.editable));
  }
  setDraggable(circle) {
    return this._circles.get(circle).then((c) => c.setDraggable(circle.draggable));
  }
  setVisible(circle) {
    return this._circles.get(circle).then((c) => c.setVisible(circle.visible));
  }
  setRadius(circle) {
    return this._circles.get(circle).then((c) => c.setRadius(circle.radius));
  }
  getNativeCircle(circle) {
    return this._circles.get(circle);
  }
  createEventObservable(eventName, circle) {
    return new Observable((observer) => {
      let listener = null;
      this._circles.get(circle).then((c) => {
        listener = c.addListener(eventName, (e) => this._zone.run(() => observer.next(e)));
      });
      return () => {
        if (listener !== null) {
          listener.remove();
        }
      };
    });
  }
};
CircleManager.decorators = [
  { type: Injectable }
];
CircleManager.ctorParameters = () => [
  { type: GoogleMapsAPIWrapper },
  { type: NgZone }
];
var DataLayerManager = class {
  constructor(_wrapper, _zone) {
    this._wrapper = _wrapper;
    this._zone = _zone;
    this._layers = /* @__PURE__ */ new Map();
  }
  /**
   * Adds a new Data Layer to the map.
   */
  addDataLayer(layer) {
    const newLayer = this._wrapper.createDataLayer({
      style: layer.style
    }).then((d) => {
      if (layer.geoJson) {
        this.getDataFeatures(d, layer.geoJson).then((features) => d.features = features);
      }
      return d;
    });
    this._layers.set(layer, newLayer);
  }
  deleteDataLayer(layer) {
    this._layers.get(layer).then((l) => {
      l.setMap(null);
      this._layers.delete(layer);
    });
  }
  updateGeoJson(layer, geoJson) {
    this._layers.get(layer).then((l) => {
      l.forEach((feature) => {
        l.remove(feature);
        const index = l.features.indexOf(feature, 0);
        if (index > -1) {
          l.features.splice(index, 1);
        }
      });
      this.getDataFeatures(l, geoJson).then((features) => l.features = features);
    });
  }
  setDataOptions(layer, options) {
    this._layers.get(layer).then((l) => {
      l.setControlPosition(options.controlPosition);
      l.setControls(options.controls);
      l.setDrawingMode(options.drawingMode);
      l.setStyle(options.style);
    });
  }
  /**
   * Creates a Google Maps event listener for the given DataLayer as an Observable
   */
  createEventObservable(eventName, layer) {
    return new Observable((observer) => {
      this._layers.get(layer).then((d) => {
        d.addListener(eventName, (e) => this._zone.run(() => observer.next(e)));
      });
    });
  }
  /**
   * Extract features from a geoJson using google.maps Data Class
   * @param d : google.maps.Data class instance
   * @param geoJson : url or geojson object
   */
  getDataFeatures(d, geoJson) {
    return new Promise((resolve, reject) => {
      if (typeof geoJson === "object") {
        try {
          const features = d.addGeoJson(geoJson);
          resolve(features);
        } catch (e) {
          reject(e);
        }
      } else if (typeof geoJson === "string") {
        d.loadGeoJson(geoJson, null, resolve);
      } else {
        reject(`Impossible to extract features from geoJson: wrong argument type`);
      }
    });
  }
};
DataLayerManager.decorators = [
  { type: Injectable }
];
DataLayerManager.ctorParameters = () => [
  { type: GoogleMapsAPIWrapper },
  { type: NgZone }
];
var FitBoundsAccessor = class {
};
var FitBoundsService = class {
  constructor(loader) {
    this._boundsChangeSampleTime$ = new BehaviorSubject(200);
    this._includeInBounds$ = new BehaviorSubject(/* @__PURE__ */ new Map());
    this.bounds$ = from(loader.load()).pipe(flatMap(() => this._includeInBounds$), sample(this._boundsChangeSampleTime$.pipe(switchMap((time) => timer(0, time)))), map((includeInBounds) => this._generateBounds(includeInBounds)), shareReplay(1));
  }
  _generateBounds(includeInBounds) {
    const bounds = new google.maps.LatLngBounds();
    includeInBounds.forEach((b) => bounds.extend(b));
    return bounds;
  }
  addToBounds(latLng) {
    const id = this._createIdentifier(latLng);
    if (this._includeInBounds$.value.has(id)) {
      return;
    }
    const boundsMap = this._includeInBounds$.value;
    boundsMap.set(id, latLng);
    this._includeInBounds$.next(boundsMap);
  }
  removeFromBounds(latLng) {
    const boundsMap = this._includeInBounds$.value;
    boundsMap.delete(this._createIdentifier(latLng));
    this._includeInBounds$.next(boundsMap);
  }
  changeFitBoundsChangeSampleTime(timeMs) {
    this._boundsChangeSampleTime$.next(timeMs);
  }
  getBounds$() {
    return this.bounds$;
  }
  _createIdentifier(latLng) {
    return `${latLng.lat}+${latLng.lng}`;
  }
};
FitBoundsService.decorators = [
  { type: Injectable }
];
FitBoundsService.ctorParameters = () => [
  { type: MapsAPILoader }
];
var AgmGeocoder = class {
  constructor(loader) {
    const connectableGeocoder$ = new Observable((subscriber) => {
      loader.load().then(() => subscriber.next());
    }).pipe(map(() => this._createGeocoder()), multicast(new ReplaySubject(1)));
    connectableGeocoder$.connect();
    this.geocoder$ = connectableGeocoder$;
  }
  geocode(request) {
    return this.geocoder$.pipe(switchMap((geocoder) => this._getGoogleResults(geocoder, request)));
  }
  _getGoogleResults(geocoder, request) {
    const geocodeObservable = bindCallback(geocoder.geocode);
    return geocodeObservable(request).pipe(switchMap(([results, status]) => {
      if (status === google.maps.GeocoderStatus.OK) {
        return of(results);
      }
      return throwError(status);
    }));
  }
  _createGeocoder() {
    return new google.maps.Geocoder();
  }
};
AgmGeocoder.ɵprov = ɵɵdefineInjectable({ factory: function AgmGeocoder_Factory() {
  return new AgmGeocoder(ɵɵinject(MapsAPILoader));
}, token: AgmGeocoder, providedIn: "root" });
AgmGeocoder.decorators = [
  { type: Injectable, args: [{ providedIn: "root" }] }
];
AgmGeocoder.ctorParameters = () => [
  { type: MapsAPILoader }
];
var WindowRef = class {
  getNativeWindow() {
    return window;
  }
};
var DocumentRef = class {
  getNativeDocument() {
    return document;
  }
};
var BROWSER_GLOBALS_PROVIDERS = [WindowRef, DocumentRef];
var GoogleMapsScriptProtocol;
(function(GoogleMapsScriptProtocol2) {
  GoogleMapsScriptProtocol2[GoogleMapsScriptProtocol2["HTTP"] = 1] = "HTTP";
  GoogleMapsScriptProtocol2[GoogleMapsScriptProtocol2["HTTPS"] = 2] = "HTTPS";
  GoogleMapsScriptProtocol2[GoogleMapsScriptProtocol2["AUTO"] = 3] = "AUTO";
})(GoogleMapsScriptProtocol || (GoogleMapsScriptProtocol = {}));
var LAZY_MAPS_API_CONFIG = new InjectionToken("angular-google-maps LAZY_MAPS_API_CONFIG");
var LazyMapsAPILoader = class extends MapsAPILoader {
  constructor(config = null, w, d, localeId) {
    super();
    this.localeId = localeId;
    this._SCRIPT_ID = "agmGoogleMapsApiScript";
    this.callbackName = `agmLazyMapsAPILoader`;
    this._config = config || {};
    this._windowRef = w;
    this._documentRef = d;
  }
  load() {
    const window2 = this._windowRef.getNativeWindow();
    if (window2.google && window2.google.maps) {
      return Promise.resolve();
    }
    if (this._scriptLoadingPromise) {
      return this._scriptLoadingPromise;
    }
    const scriptOnPage = this._documentRef.getNativeDocument().getElementById(this._SCRIPT_ID);
    if (scriptOnPage) {
      this._assignScriptLoadingPromise(scriptOnPage);
      return this._scriptLoadingPromise;
    }
    const script = this._documentRef.getNativeDocument().createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.defer = true;
    script.id = this._SCRIPT_ID;
    script.src = this._getScriptSrc(this.callbackName);
    this._assignScriptLoadingPromise(script);
    this._documentRef.getNativeDocument().body.appendChild(script);
    return this._scriptLoadingPromise;
  }
  _assignScriptLoadingPromise(scriptElem) {
    this._scriptLoadingPromise = new Promise((resolve, reject) => {
      this._windowRef.getNativeWindow()[this.callbackName] = () => {
        resolve();
      };
      scriptElem.onerror = (error) => {
        reject(error);
      };
    });
  }
  _getScriptSrc(callbackName) {
    const protocolType = this._config && this._config.protocol || GoogleMapsScriptProtocol.HTTPS;
    let protocol;
    switch (protocolType) {
      case GoogleMapsScriptProtocol.AUTO:
        protocol = "";
        break;
      case GoogleMapsScriptProtocol.HTTP:
        protocol = "http:";
        break;
      case GoogleMapsScriptProtocol.HTTPS:
        protocol = "https:";
        break;
    }
    const hostAndPath = this._config.hostAndPath || "maps.googleapis.com/maps/api/js";
    const queryParams = {
      v: this._config.apiVersion || "quarterly",
      callback: callbackName,
      key: this._config.apiKey,
      client: this._config.clientId,
      channel: this._config.channel,
      libraries: this._config.libraries,
      region: this._config.region,
      language: this._config.language || (this.localeId !== "en-US" ? this.localeId : null)
    };
    const params = Object.keys(queryParams).filter((k) => queryParams[k] != null).filter((k) => {
      return !Array.isArray(queryParams[k]) || Array.isArray(queryParams[k]) && queryParams[k].length > 0;
    }).map((k) => {
      const i = queryParams[k];
      if (Array.isArray(i)) {
        return { key: k, value: i.join(",") };
      }
      return { key: k, value: queryParams[k] };
    }).map((entry) => {
      return `${entry.key}=${entry.value}`;
    }).join("&");
    return `${protocol}//${hostAndPath}?${params}`;
  }
};
LazyMapsAPILoader.decorators = [
  { type: Injectable }
];
LazyMapsAPILoader.ctorParameters = () => [
  { type: void 0, decorators: [{ type: Optional }, { type: Inject, args: [LAZY_MAPS_API_CONFIG] }] },
  { type: WindowRef },
  { type: DocumentRef },
  { type: String, decorators: [{ type: Inject, args: [LOCALE_ID] }] }
];
var MarkerManager = class {
  constructor(_mapsWrapper, _zone) {
    this._mapsWrapper = _mapsWrapper;
    this._zone = _zone;
    this._markers = /* @__PURE__ */ new Map();
  }
  convertAnimation(uiAnim) {
    return __awaiter(this, void 0, void 0, function* () {
      if (uiAnim === null) {
        return null;
      } else {
        return this._mapsWrapper.getNativeMap().then(() => google.maps.Animation[uiAnim]);
      }
    });
  }
  deleteMarker(markerDirective) {
    const markerPromise = this._markers.get(markerDirective);
    if (markerPromise == null) {
      return Promise.resolve();
    }
    return markerPromise.then((marker) => {
      return this._zone.run(() => {
        marker.setMap(null);
        this._markers.delete(markerDirective);
      });
    });
  }
  updateMarkerPosition(marker) {
    return this._markers.get(marker).then((m) => m.setPosition({ lat: marker.latitude, lng: marker.longitude }));
  }
  updateTitle(marker) {
    return this._markers.get(marker).then((m) => m.setTitle(marker.title));
  }
  updateLabel(marker) {
    return this._markers.get(marker).then((m) => {
      m.setLabel(marker.label);
    });
  }
  updateDraggable(marker) {
    return this._markers.get(marker).then((m) => m.setDraggable(marker.draggable));
  }
  updateIcon(marker) {
    return this._markers.get(marker).then((m) => m.setIcon(marker.iconUrl));
  }
  updateOpacity(marker) {
    return this._markers.get(marker).then((m) => m.setOpacity(marker.opacity));
  }
  updateVisible(marker) {
    return this._markers.get(marker).then((m) => m.setVisible(marker.visible));
  }
  updateZIndex(marker) {
    return this._markers.get(marker).then((m) => m.setZIndex(marker.zIndex));
  }
  updateClickable(marker) {
    return this._markers.get(marker).then((m) => m.setClickable(marker.clickable));
  }
  updateAnimation(marker) {
    return __awaiter(this, void 0, void 0, function* () {
      const m = yield this._markers.get(marker);
      m.setAnimation(yield this.convertAnimation(marker.animation));
    });
  }
  addMarker(marker) {
    const markerPromise = new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
      return this._mapsWrapper.createMarker({
        position: { lat: marker.latitude, lng: marker.longitude },
        label: marker.label,
        draggable: marker.draggable,
        icon: marker.iconUrl,
        opacity: marker.opacity,
        visible: marker.visible,
        zIndex: marker.zIndex,
        title: marker.title,
        clickable: marker.clickable,
        animation: yield this.convertAnimation(marker.animation)
      }).then(resolve);
    }));
    this._markers.set(marker, markerPromise);
  }
  getNativeMarker(marker) {
    return this._markers.get(marker);
  }
  createEventObservable(eventName, marker) {
    return new Observable((observer) => {
      this._markers.get(marker).then((m) => m.addListener(eventName, (e) => this._zone.run(() => observer.next(e))));
    });
  }
};
MarkerManager.decorators = [
  { type: Injectable }
];
MarkerManager.ctorParameters = () => [
  { type: GoogleMapsAPIWrapper },
  { type: NgZone }
];
var InfoWindowManager = class {
  constructor(_mapsWrapper, _zone, _markerManager) {
    this._mapsWrapper = _mapsWrapper;
    this._zone = _zone;
    this._markerManager = _markerManager;
    this._infoWindows = /* @__PURE__ */ new Map();
  }
  deleteInfoWindow(infoWindow) {
    const iWindow = this._infoWindows.get(infoWindow);
    if (iWindow == null) {
      return Promise.resolve();
    }
    return iWindow.then((i) => {
      return this._zone.run(() => {
        i.close();
        this._infoWindows.delete(infoWindow);
      });
    });
  }
  setPosition(infoWindow) {
    return this._infoWindows.get(infoWindow).then((i) => i.setPosition({
      lat: infoWindow.latitude,
      lng: infoWindow.longitude
    }));
  }
  setZIndex(infoWindow) {
    return this._infoWindows.get(infoWindow).then((i) => i.setZIndex(infoWindow.zIndex));
  }
  open(infoWindow) {
    return this._infoWindows.get(infoWindow).then((w) => {
      if (infoWindow.hostMarker != null) {
        return this._markerManager.getNativeMarker(infoWindow.hostMarker).then((marker) => {
          return this._mapsWrapper.getNativeMap().then((map2) => w.open(map2, marker));
        });
      }
      return this._mapsWrapper.getNativeMap().then((map2) => w.open(map2));
    });
  }
  close(infoWindow) {
    return this._infoWindows.get(infoWindow).then((w) => w.close());
  }
  setOptions(infoWindow, options) {
    return this._infoWindows.get(infoWindow).then((i) => i.setOptions(options));
  }
  addInfoWindow(infoWindow) {
    const options = {
      content: infoWindow.content,
      maxWidth: infoWindow.maxWidth,
      zIndex: infoWindow.zIndex,
      disableAutoPan: infoWindow.disableAutoPan
    };
    if (typeof infoWindow.latitude === "number" && typeof infoWindow.longitude === "number") {
      options.position = { lat: infoWindow.latitude, lng: infoWindow.longitude };
    }
    const infoWindowPromise = this._mapsWrapper.createInfoWindow(options);
    this._infoWindows.set(infoWindow, infoWindowPromise);
  }
  /**
   * Creates a Google Maps event listener for the given InfoWindow as an Observable
   */
  createEventObservable(eventName, infoWindow) {
    return new Observable((observer) => {
      this._infoWindows.get(infoWindow).then((i) => {
        i.addListener(eventName, (e) => this._zone.run(() => observer.next(e)));
      });
    });
  }
};
InfoWindowManager.decorators = [
  { type: Injectable }
];
InfoWindowManager.ctorParameters = () => [
  { type: GoogleMapsAPIWrapper },
  { type: NgZone },
  { type: MarkerManager }
];
var KmlLayerManager = class {
  constructor(_wrapper, _zone) {
    this._wrapper = _wrapper;
    this._zone = _zone;
    this._layers = /* @__PURE__ */ new Map();
  }
  /**
   * Adds a new KML Layer to the map.
   */
  addKmlLayer(layer) {
    const newLayer = this._wrapper.getNativeMap().then((m) => {
      return new google.maps.KmlLayer({
        clickable: layer.clickable,
        map: m,
        preserveViewport: layer.preserveViewport,
        screenOverlays: layer.screenOverlays,
        suppressInfoWindows: layer.suppressInfoWindows,
        url: layer.url,
        zIndex: layer.zIndex
      });
    });
    this._layers.set(layer, newLayer);
  }
  setOptions(layer, options) {
    this._layers.get(layer).then((l) => l.setOptions(options));
  }
  deleteKmlLayer(layer) {
    this._layers.get(layer).then((l) => {
      l.setMap(null);
      this._layers.delete(layer);
    });
  }
  /**
   * Creates a Google Maps event listener for the given KmlLayer as an Observable
   */
  createEventObservable(eventName, layer) {
    return new Observable((observer) => {
      this._layers.get(layer).then((m) => {
        m.addListener(eventName, (e) => this._zone.run(() => observer.next(e)));
      });
    });
  }
};
KmlLayerManager.decorators = [
  { type: Injectable }
];
KmlLayerManager.ctorParameters = () => [
  { type: GoogleMapsAPIWrapper },
  { type: NgZone }
];
var LayerManager = class {
  constructor(_wrapper) {
    this._wrapper = _wrapper;
    this._layers = /* @__PURE__ */ new Map();
  }
  /**
   * Adds a transit layer to a map instance.
   * @param layer - a TransitLayer object
   * @param _options - TransitLayerOptions options
   * @returns void
   */
  addTransitLayer(layer) {
    const newLayer = this._wrapper.createTransitLayer();
    this._layers.set(layer, newLayer);
  }
  /**
   * Adds a bicycling layer to a map instance.
   * @param layer - a bicycling layer object
   * @param _options - BicyclingLayer options
   * @returns void
   */
  addBicyclingLayer(layer) {
    const newLayer = this._wrapper.createBicyclingLayer();
    this._layers.set(layer, newLayer);
  }
  /**
   * Deletes a map layer
   * @param layer - the layer to delete
   */
  deleteLayer(layer) {
    return this._layers.get(layer).then((currentLayer) => {
      currentLayer.setMap(null);
      this._layers.delete(layer);
    });
  }
};
LayerManager.decorators = [
  { type: Injectable }
];
LayerManager.ctorParameters = () => [
  { type: GoogleMapsAPIWrapper }
];
var NoOpMapsAPILoader = class {
  load() {
    if (!window.google || !window.google.maps) {
      throw new Error("Google Maps API not loaded on page. Make sure window.google.maps is available!");
    }
    return Promise.resolve();
  }
};
function createMVCEventObservable(array) {
  const eventNames = ["insert_at", "remove_at", "set_at"];
  return fromEventPattern((handler) => eventNames.map((eventName) => array.addListener(eventName, (index, previous) => handler.apply(array, [{ newArr: array.getArray(), eventName, index, previous }]))), (_handler, evListeners) => evListeners.forEach((evListener) => evListener.remove()));
}
var PolygonManager = class {
  constructor(_mapsWrapper, _zone) {
    this._mapsWrapper = _mapsWrapper;
    this._zone = _zone;
    this._polygons = /* @__PURE__ */ new Map();
  }
  addPolygon(path) {
    const polygonPromise = this._mapsWrapper.createPolygon({
      clickable: path.clickable,
      draggable: path.draggable,
      editable: path.editable,
      fillColor: path.fillColor,
      fillOpacity: path.fillOpacity,
      geodesic: path.geodesic,
      paths: path.paths,
      strokeColor: path.strokeColor,
      strokeOpacity: path.strokeOpacity,
      strokeWeight: path.strokeWeight,
      visible: path.visible,
      zIndex: path.zIndex
    });
    this._polygons.set(path, polygonPromise);
  }
  updatePolygon(polygon) {
    const m = this._polygons.get(polygon);
    if (m == null) {
      return Promise.resolve();
    }
    return m.then((l) => this._zone.run(() => {
      l.setPaths(polygon.paths);
    }));
  }
  setPolygonOptions(path, options) {
    return this._polygons.get(path).then((l) => {
      l.setOptions(options);
    });
  }
  deletePolygon(paths) {
    const m = this._polygons.get(paths);
    if (m == null) {
      return Promise.resolve();
    }
    return m.then((l) => {
      return this._zone.run(() => {
        l.setMap(null);
        this._polygons.delete(paths);
      });
    });
  }
  getPath(polygonDirective) {
    return this._polygons.get(polygonDirective).then((polygon) => polygon.getPath().getArray());
  }
  getPaths(polygonDirective) {
    return this._polygons.get(polygonDirective).then((polygon) => polygon.getPaths().getArray().map((p) => p.getArray()));
  }
  createEventObservable(eventName, path) {
    return new Observable((observer) => {
      this._polygons.get(path).then((l) => {
        l.addListener(eventName, (e) => this._zone.run(() => observer.next(e)));
      });
    });
  }
  createPathEventObservable(agmPolygon) {
    return __awaiter(this, void 0, void 0, function* () {
      const polygon = yield this._polygons.get(agmPolygon);
      const paths = polygon.getPaths();
      const pathsChanges$ = createMVCEventObservable(paths);
      return pathsChanges$.pipe(
        startWith({ newArr: paths.getArray() }),
        // in order to subscribe to them all
        switchMap((parentMVEvent) => merge(...// rest parameter
        parentMVEvent.newArr.map((chMVC, index) => createMVCEventObservable(chMVC).pipe(map((chMVCEvent) => ({ parentMVEvent, chMVCEvent, pathIndex: index }))))).pipe(
          // start the merged ob with an event signinifing change to parent
          startWith({ parentMVEvent, chMVCEvent: null, pathIndex: null })
        )),
        skip(1),
        // skip the manually added event
        map(({ parentMVEvent, chMVCEvent, pathIndex }) => {
          let retVal;
          if (!chMVCEvent) {
            retVal = {
              newArr: parentMVEvent.newArr.map((subArr) => subArr.getArray().map((latLng) => latLng.toJSON())),
              eventName: parentMVEvent.eventName,
              index: parentMVEvent.index
            };
            if (parentMVEvent.previous) {
              retVal.previous = parentMVEvent.previous.getArray();
            }
          } else {
            retVal = {
              newArr: parentMVEvent.newArr.map((subArr) => subArr.getArray().map((latLng) => latLng.toJSON())),
              pathIndex,
              eventName: chMVCEvent.eventName,
              index: chMVCEvent.index
            };
            if (chMVCEvent.previous) {
              retVal.previous = chMVCEvent.previous;
            }
          }
          return retVal;
        })
      );
    });
  }
};
PolygonManager.decorators = [
  { type: Injectable }
];
PolygonManager.ctorParameters = () => [
  { type: GoogleMapsAPIWrapper },
  { type: NgZone }
];
var PolylineManager = class _PolylineManager {
  constructor(_mapsWrapper, _zone) {
    this._mapsWrapper = _mapsWrapper;
    this._zone = _zone;
    this._polylines = /* @__PURE__ */ new Map();
  }
  static _convertPoints(line) {
    const path = line._getPoints().map((point) => {
      return { lat: point.latitude, lng: point.longitude };
    });
    return path;
  }
  static _convertPath(path) {
    const symbolPath = google.maps.SymbolPath[path];
    if (typeof symbolPath === "number") {
      return symbolPath;
    } else {
      return path;
    }
  }
  static _convertIcons(line) {
    const icons = line._getIcons().map((agmIcon) => ({
      fixedRotation: agmIcon.fixedRotation,
      offset: agmIcon.offset,
      repeat: agmIcon.repeat,
      icon: {
        anchor: new google.maps.Point(agmIcon.anchorX, agmIcon.anchorY),
        fillColor: agmIcon.fillColor,
        fillOpacity: agmIcon.fillOpacity,
        path: _PolylineManager._convertPath(agmIcon.path),
        rotation: agmIcon.rotation,
        scale: agmIcon.scale,
        strokeColor: agmIcon.strokeColor,
        strokeOpacity: agmIcon.strokeOpacity,
        strokeWeight: agmIcon.strokeWeight
      }
    }));
    icons.forEach((icon) => {
      Object.entries(icon).forEach(([key, val]) => {
        if (typeof val === "undefined") {
          delete icon[key];
        }
      });
      if (typeof icon.icon.anchor.x === "undefined" || typeof icon.icon.anchor.y === "undefined") {
        delete icon.icon.anchor;
      }
    });
    return icons;
  }
  addPolyline(line) {
    const polylinePromise = this._mapsWrapper.getNativeMap().then(() => [
      _PolylineManager._convertPoints(line),
      _PolylineManager._convertIcons(line)
    ]).then(([path, icons]) => this._mapsWrapper.createPolyline({
      clickable: line.clickable,
      draggable: line.draggable,
      editable: line.editable,
      geodesic: line.geodesic,
      strokeColor: line.strokeColor,
      strokeOpacity: line.strokeOpacity,
      strokeWeight: line.strokeWeight,
      visible: line.visible,
      zIndex: line.zIndex,
      path,
      icons
    }));
    this._polylines.set(line, polylinePromise);
  }
  updatePolylinePoints(line) {
    const path = _PolylineManager._convertPoints(line);
    const m = this._polylines.get(line);
    if (m == null) {
      return Promise.resolve();
    }
    return m.then((l) => this._zone.run(() => l.setPath(path)));
  }
  updateIconSequences(line) {
    return __awaiter(this, void 0, void 0, function* () {
      yield this._mapsWrapper.getNativeMap();
      const icons = _PolylineManager._convertIcons(line);
      const m = this._polylines.get(line);
      if (m == null) {
        return;
      }
      return m.then((l) => this._zone.run(() => l.setOptions({ icons })));
    });
  }
  setPolylineOptions(line, options) {
    return this._polylines.get(line).then((l) => {
      l.setOptions(options);
    });
  }
  deletePolyline(line) {
    const m = this._polylines.get(line);
    if (m == null) {
      return Promise.resolve();
    }
    return m.then((l) => {
      return this._zone.run(() => {
        l.setMap(null);
        this._polylines.delete(line);
      });
    });
  }
  getMVCPath(agmPolyline) {
    return __awaiter(this, void 0, void 0, function* () {
      const polyline = yield this._polylines.get(agmPolyline);
      return polyline.getPath();
    });
  }
  getPath(agmPolyline) {
    return __awaiter(this, void 0, void 0, function* () {
      return (yield this.getMVCPath(agmPolyline)).getArray();
    });
  }
  createEventObservable(eventName, line) {
    return new Observable((observer) => {
      this._polylines.get(line).then((l) => {
        l.addListener(eventName, (e) => this._zone.run(() => observer.next(e)));
      });
    });
  }
  createPathEventObservable(line) {
    return __awaiter(this, void 0, void 0, function* () {
      const mvcPath = yield this.getMVCPath(line);
      return createMVCEventObservable(mvcPath);
    });
  }
};
PolylineManager.decorators = [
  { type: Injectable }
];
PolylineManager.ctorParameters = () => [
  { type: GoogleMapsAPIWrapper },
  { type: NgZone }
];
var RectangleManager = class {
  constructor(_apiWrapper, _zone) {
    this._apiWrapper = _apiWrapper;
    this._zone = _zone;
    this._rectangles = /* @__PURE__ */ new Map();
  }
  addRectangle(rectangle) {
    this._apiWrapper.getNativeMap().then(() => this._rectangles.set(rectangle, this._apiWrapper.createRectangle({
      bounds: {
        north: rectangle.north,
        east: rectangle.east,
        south: rectangle.south,
        west: rectangle.west
      },
      clickable: rectangle.clickable,
      draggable: rectangle.draggable,
      editable: rectangle.editable,
      fillColor: rectangle.fillColor,
      fillOpacity: rectangle.fillOpacity,
      strokeColor: rectangle.strokeColor,
      strokeOpacity: rectangle.strokeOpacity,
      strokePosition: google.maps.StrokePosition[rectangle.strokePosition],
      strokeWeight: rectangle.strokeWeight,
      visible: rectangle.visible,
      zIndex: rectangle.zIndex
    })));
  }
  /**
   * Removes the given rectangle from the map.
   */
  removeRectangle(rectangle) {
    return this._rectangles.get(rectangle).then((r) => {
      r.setMap(null);
      this._rectangles.delete(rectangle);
    });
  }
  setOptions(rectangle, options) {
    return this._rectangles.get(rectangle).then((r) => {
      const actualStrokePosition = options.strokePosition;
      options.strokePosition = google.maps.StrokePosition[actualStrokePosition];
      r.setOptions(options);
    });
  }
  getBounds(rectangle) {
    return this._rectangles.get(rectangle).then((r) => r.getBounds());
  }
  setBounds(rectangle) {
    return this._rectangles.get(rectangle).then((r) => {
      return r.setBounds({
        north: rectangle.north,
        east: rectangle.east,
        south: rectangle.south,
        west: rectangle.west
      });
    });
  }
  setEditable(rectangle) {
    return this._rectangles.get(rectangle).then((r) => {
      return r.setEditable(rectangle.editable);
    });
  }
  setDraggable(rectangle) {
    return this._rectangles.get(rectangle).then((r) => {
      return r.setDraggable(rectangle.draggable);
    });
  }
  setVisible(rectangle) {
    return this._rectangles.get(rectangle).then((r) => {
      return r.setVisible(rectangle.visible);
    });
  }
  createEventObservable(eventName, rectangle) {
    return new Observable((subsrciber) => {
      let listener = null;
      this._rectangles.get(rectangle).then((r) => {
        listener = r.addListener(eventName, (e) => this._zone.run(() => subsrciber.next(e)));
      });
      return () => {
        if (listener !== null) {
          listener.remove();
        }
      };
    });
  }
};
RectangleManager.decorators = [
  { type: Injectable }
];
RectangleManager.ctorParameters = () => [
  { type: GoogleMapsAPIWrapper },
  { type: NgZone }
];
var layerId = 0;
var AgmBicyclingLayer = class {
  constructor(_manager) {
    this._manager = _manager;
    this._addedToManager = false;
    this._id = (layerId++).toString();
    this.visible = true;
  }
  ngOnInit() {
    if (this._addedToManager) {
      return;
    }
    this._manager.addBicyclingLayer(this);
    this._addedToManager = true;
  }
  /** @internal */
  id() {
    return this._id;
  }
  /** @internal */
  toString() {
    return `AgmBicyclingLayer-${this._id.toString()}`;
  }
  /** @internal */
  ngOnDestroy() {
    this._manager.deleteLayer(this);
  }
};
AgmBicyclingLayer.decorators = [
  { type: Directive, args: [{
    selector: "agm-bicycling-layer"
  }] }
];
AgmBicyclingLayer.ctorParameters = () => [
  { type: LayerManager }
];
AgmBicyclingLayer.propDecorators = {
  visible: [{ type: Input }]
};
var AgmCircle = class _AgmCircle {
  constructor(_manager) {
    this._manager = _manager;
    this.clickable = true;
    this.draggable = false;
    this.editable = false;
    this.radius = 0;
    this.strokePosition = "CENTER";
    this.strokeWeight = 0;
    this.visible = true;
    this.centerChange = new EventEmitter();
    this.circleClick = new EventEmitter();
    this.circleDblClick = new EventEmitter();
    this.drag = new EventEmitter();
    this.dragEnd = new EventEmitter();
    this.dragStart = new EventEmitter();
    this.mouseDown = new EventEmitter();
    this.mouseMove = new EventEmitter();
    this.mouseOut = new EventEmitter();
    this.mouseOver = new EventEmitter();
    this.mouseUp = new EventEmitter();
    this.radiusChange = new EventEmitter();
    this.rightClick = new EventEmitter();
    this._circleAddedToManager = false;
    this._eventSubscriptions = [];
  }
  /** @internal */
  ngOnInit() {
    this._manager.addCircle(this);
    this._circleAddedToManager = true;
    this._registerEventListeners();
  }
  /** @internal */
  ngOnChanges(changes) {
    if (!this._circleAddedToManager) {
      return;
    }
    if (changes["latitude"] || changes["longitude"]) {
      this._manager.setCenter(this);
    }
    if (changes["editable"]) {
      this._manager.setEditable(this);
    }
    if (changes["draggable"]) {
      this._manager.setDraggable(this);
    }
    if (changes["visible"]) {
      this._manager.setVisible(this);
    }
    if (changes["radius"]) {
      this._manager.setRadius(this);
    }
    this._updateCircleOptionsChanges(changes);
  }
  _updateCircleOptionsChanges(changes) {
    const options = {};
    const optionKeys = Object.keys(changes).filter((k) => _AgmCircle._mapOptions.indexOf(k) !== -1);
    optionKeys.forEach((k) => {
      options[k] = changes[k].currentValue;
    });
    if (optionKeys.length > 0) {
      this._manager.setOptions(this, options);
    }
  }
  _registerEventListeners() {
    const events = /* @__PURE__ */ new Map();
    events.set("center_changed", this.centerChange);
    events.set("click", this.circleClick);
    events.set("dblclick", this.circleDblClick);
    events.set("drag", this.drag);
    events.set("dragend", this.dragEnd);
    events.set("dragstart", this.dragStart);
    events.set("mousedown", this.mouseDown);
    events.set("mousemove", this.mouseMove);
    events.set("mouseout", this.mouseOut);
    events.set("mouseover", this.mouseOver);
    events.set("mouseup", this.mouseUp);
    events.set("radius_changed", this.radiusChange);
    events.set("rightclick", this.rightClick);
    events.forEach((eventEmitter, eventName) => {
      this._eventSubscriptions.push(this._manager.createEventObservable(eventName, this).subscribe((value) => {
        switch (eventName) {
          case "radius_changed":
            this._manager.getRadius(this).then((radius) => eventEmitter.emit(radius));
            break;
          case "center_changed":
            this._manager.getCenter(this).then((center) => eventEmitter.emit({ lat: center.lat(), lng: center.lng() }));
            break;
          default:
            eventEmitter.emit(value);
        }
      }));
    });
  }
  /** @internal */
  ngOnDestroy() {
    this._eventSubscriptions.forEach((s) => s.unsubscribe());
    this._eventSubscriptions = null;
    this._manager.removeCircle(this);
  }
  /**
   * Gets the LatLngBounds of this Circle.
   */
  getBounds() {
    return this._manager.getBounds(this);
  }
  getCenter() {
    return this._manager.getCenter(this);
  }
};
AgmCircle._mapOptions = [
  "fillColor",
  "fillOpacity",
  "strokeColor",
  "strokeOpacity",
  "strokePosition",
  "strokeWeight",
  "visible",
  "zIndex",
  "clickable"
];
AgmCircle.decorators = [
  { type: Directive, args: [{
    selector: "agm-circle"
  }] }
];
AgmCircle.ctorParameters = () => [
  { type: CircleManager }
];
AgmCircle.propDecorators = {
  latitude: [{ type: Input }],
  longitude: [{ type: Input }],
  clickable: [{ type: Input }],
  draggable: [{ type: Input, args: ["circleDraggable"] }],
  editable: [{ type: Input }],
  fillColor: [{ type: Input }],
  fillOpacity: [{ type: Input }],
  radius: [{ type: Input }],
  strokeColor: [{ type: Input }],
  strokeOpacity: [{ type: Input }],
  strokePosition: [{ type: Input }],
  strokeWeight: [{ type: Input }],
  visible: [{ type: Input }],
  zIndex: [{ type: Input }],
  centerChange: [{ type: Output }],
  circleClick: [{ type: Output }],
  circleDblClick: [{ type: Output }],
  drag: [{ type: Output }],
  dragEnd: [{ type: Output }],
  dragStart: [{ type: Output }],
  mouseDown: [{ type: Output }],
  mouseMove: [{ type: Output }],
  mouseOut: [{ type: Output }],
  mouseOver: [{ type: Output }],
  mouseUp: [{ type: Output }],
  radiusChange: [{ type: Output }],
  rightClick: [{ type: Output }]
};
var layerId$1 = 0;
var AgmDataLayer = class _AgmDataLayer {
  constructor(_manager) {
    this._manager = _manager;
    this._addedToManager = false;
    this._id = (layerId$1++).toString();
    this._subscriptions = [];
    this.layerClick = new EventEmitter();
    this.geoJson = null;
  }
  ngOnInit() {
    if (this._addedToManager) {
      return;
    }
    this._manager.addDataLayer(this);
    this._addedToManager = true;
    this._addEventListeners();
  }
  _addEventListeners() {
    const listeners = [
      { name: "click", handler: (ev) => this.layerClick.emit(ev) }
    ];
    listeners.forEach((obj) => {
      const os = this._manager.createEventObservable(obj.name, this).subscribe(obj.handler);
      this._subscriptions.push(os);
    });
  }
  /** @internal */
  id() {
    return this._id;
  }
  /** @internal */
  toString() {
    return `AgmDataLayer-${this._id.toString()}`;
  }
  /** @internal */
  ngOnDestroy() {
    this._manager.deleteDataLayer(this);
    this._subscriptions.forEach((s) => s.unsubscribe());
  }
  /** @internal */
  ngOnChanges(changes) {
    if (!this._addedToManager) {
      return;
    }
    const geoJsonChange = changes["geoJson"];
    if (geoJsonChange) {
      this._manager.updateGeoJson(this, geoJsonChange.currentValue);
    }
    const dataOptions = _AgmDataLayer._dataOptionsAttributes.reduce((options, k) => options[k] = changes.hasOwnProperty(k) ? changes[k].currentValue : this[k], {});
    this._manager.setDataOptions(this, dataOptions);
  }
};
AgmDataLayer._dataOptionsAttributes = ["style"];
AgmDataLayer.decorators = [
  { type: Directive, args: [{
    selector: "agm-data-layer"
  }] }
];
AgmDataLayer.ctorParameters = () => [
  { type: DataLayerManager }
];
AgmDataLayer.propDecorators = {
  layerClick: [{ type: Output }],
  geoJson: [{ type: Input }],
  style: [{ type: Input }]
};
var AgmFitBounds = class {
  constructor(_fitBoundsAccessor, _fitBoundsService) {
    this._fitBoundsAccessor = _fitBoundsAccessor;
    this._fitBoundsService = _fitBoundsService;
    this.agmFitBounds = true;
    this._destroyed$ = new Subject();
    this._latestFitBoundsDetails = null;
  }
  /**
   * @internal
   */
  ngOnChanges() {
    this._updateBounds();
  }
  /**
   * @internal
   */
  ngOnInit() {
    this._fitBoundsAccessor.getFitBoundsDetails$().pipe(distinctUntilChanged((x, y) => x.latLng.lat === y.latLng.lat && x.latLng.lng === y.latLng.lng), takeUntil(this._destroyed$)).subscribe((details) => this._updateBounds(details));
  }
  /*
   Either the location changed, or visible status changed.
   Possible state changes are
   invisible -> visible
   visible -> invisible
   visible -> visible (new location)
  */
  _updateBounds(newFitBoundsDetails) {
    if (this._latestFitBoundsDetails) {
      this._fitBoundsService.removeFromBounds(this._latestFitBoundsDetails.latLng);
    }
    if (newFitBoundsDetails) {
      this._latestFitBoundsDetails = newFitBoundsDetails;
    }
    if (!this._latestFitBoundsDetails) {
      return;
    }
    if (this.agmFitBounds === true) {
      this._fitBoundsService.addToBounds(this._latestFitBoundsDetails.latLng);
    }
  }
  /**
   * @internal
   */
  ngOnDestroy() {
    this._destroyed$.next();
    this._destroyed$.complete();
    if (this._latestFitBoundsDetails !== null) {
      this._fitBoundsService.removeFromBounds(this._latestFitBoundsDetails.latLng);
    }
  }
};
AgmFitBounds.decorators = [
  { type: Directive, args: [{
    selector: "[agmFitBounds]"
  }] }
];
AgmFitBounds.ctorParameters = () => [
  { type: FitBoundsAccessor, decorators: [{ type: Self }] },
  { type: FitBoundsService }
];
AgmFitBounds.propDecorators = {
  agmFitBounds: [{ type: Input }]
};
var infoWindowId = 0;
var AgmInfoWindow = class _AgmInfoWindow {
  constructor(_infoWindowManager, _el) {
    this._infoWindowManager = _infoWindowManager;
    this._el = _el;
    this.isOpen = false;
    this.infoWindowClose = new EventEmitter();
    this._infoWindowAddedToManager = false;
    this._id = (infoWindowId++).toString();
  }
  ngOnInit() {
    this.content = this._el.nativeElement.querySelector(".agm-info-window-content");
    this._infoWindowManager.addInfoWindow(this);
    this._infoWindowAddedToManager = true;
    this._updateOpenState();
    this._registerEventListeners();
  }
  /** @internal */
  ngOnChanges(changes) {
    if (!this._infoWindowAddedToManager) {
      return;
    }
    if ((changes["latitude"] || changes["longitude"]) && typeof this.latitude === "number" && typeof this.longitude === "number") {
      this._infoWindowManager.setPosition(this);
    }
    if (changes["zIndex"]) {
      this._infoWindowManager.setZIndex(this);
    }
    if (changes["isOpen"]) {
      this._updateOpenState();
    }
    this._setInfoWindowOptions(changes);
  }
  // tslint:enable: no-string-literal
  _registerEventListeners() {
    this._infoWindowManager.createEventObservable("closeclick", this).subscribe(() => {
      this.isOpen = false;
      this.infoWindowClose.emit();
    });
  }
  _updateOpenState() {
    this.isOpen ? this.open() : this.close();
  }
  _setInfoWindowOptions(changes) {
    const options = {};
    const optionKeys = Object.keys(changes).filter((k) => _AgmInfoWindow._infoWindowOptionsInputs.indexOf(k) !== -1);
    optionKeys.forEach((k) => {
      options[k] = changes[k].currentValue;
    });
    this._infoWindowManager.setOptions(this, options);
  }
  /**
   * Opens the info window.
   */
  open() {
    return this._infoWindowManager.open(this);
  }
  /**
   * Closes the info window.
   */
  close() {
    return this._infoWindowManager.close(this).then(() => {
      this.infoWindowClose.emit();
    });
  }
  /** @internal */
  id() {
    return this._id;
  }
  /** @internal */
  toString() {
    return "AgmInfoWindow-" + this._id.toString();
  }
  /** @internal */
  ngOnDestroy() {
    this._infoWindowManager.deleteInfoWindow(this);
  }
};
AgmInfoWindow._infoWindowOptionsInputs = ["disableAutoPan", "maxWidth"];
AgmInfoWindow.decorators = [
  { type: Component, args: [{
    selector: "agm-info-window",
    template: `<div class='agm-info-window-content'>
      <ng-content></ng-content>
    </div>
  `
  }] }
];
AgmInfoWindow.ctorParameters = () => [
  { type: InfoWindowManager },
  { type: ElementRef }
];
AgmInfoWindow.propDecorators = {
  latitude: [{ type: Input }],
  longitude: [{ type: Input }],
  disableAutoPan: [{ type: Input }],
  zIndex: [{ type: Input }],
  maxWidth: [{ type: Input }],
  isOpen: [{ type: Input }],
  infoWindowClose: [{ type: Output }]
};
var layerId$2 = 0;
var AgmKmlLayer = class _AgmKmlLayer {
  constructor(_manager) {
    this._manager = _manager;
    this._addedToManager = false;
    this._id = (layerId$2++).toString();
    this._subscriptions = [];
    this.clickable = true;
    this.preserveViewport = false;
    this.screenOverlays = true;
    this.suppressInfoWindows = false;
    this.url = null;
    this.zIndex = null;
    this.layerClick = new EventEmitter();
    this.defaultViewportChange = new EventEmitter();
    this.statusChange = new EventEmitter();
  }
  ngOnInit() {
    if (this._addedToManager) {
      return;
    }
    this._manager.addKmlLayer(this);
    this._addedToManager = true;
    this._addEventListeners();
  }
  ngOnChanges(changes) {
    if (!this._addedToManager) {
      return;
    }
    this._updatePolygonOptions(changes);
  }
  _updatePolygonOptions(changes) {
    const options = Object.keys(changes).filter((k) => _AgmKmlLayer._kmlLayerOptions.indexOf(k) !== -1).reduce((obj, k) => {
      obj[k] = changes[k].currentValue;
      return obj;
    }, {});
    if (Object.keys(options).length > 0) {
      this._manager.setOptions(this, options);
    }
  }
  _addEventListeners() {
    const listeners = [
      { name: "click", handler: (ev) => this.layerClick.emit(ev) },
      { name: "defaultviewport_changed", handler: () => this.defaultViewportChange.emit() },
      { name: "status_changed", handler: () => this.statusChange.emit() }
    ];
    listeners.forEach((obj) => {
      const os = this._manager.createEventObservable(obj.name, this).subscribe(obj.handler);
      this._subscriptions.push(os);
    });
  }
  /** @internal */
  id() {
    return this._id;
  }
  /** @internal */
  toString() {
    return `AgmKmlLayer-${this._id.toString()}`;
  }
  /** @internal */
  ngOnDestroy() {
    this._manager.deleteKmlLayer(this);
    this._subscriptions.forEach((s) => s.unsubscribe());
  }
};
AgmKmlLayer._kmlLayerOptions = ["clickable", "preserveViewport", "screenOverlays", "suppressInfoWindows", "url", "zIndex"];
AgmKmlLayer.decorators = [
  { type: Directive, args: [{
    selector: "agm-kml-layer"
  }] }
];
AgmKmlLayer.ctorParameters = () => [
  { type: KmlLayerManager }
];
AgmKmlLayer.propDecorators = {
  clickable: [{ type: Input }],
  preserveViewport: [{ type: Input }],
  screenOverlays: [{ type: Input }],
  suppressInfoWindows: [{ type: Input }],
  url: [{ type: Input }],
  zIndex: [{ type: Input }],
  layerClick: [{ type: Output }],
  defaultViewportChange: [{ type: Output }],
  statusChange: [{ type: Output }]
};
var AgmMapControl = class {
};
AgmMapControl.decorators = [
  { type: Directive }
];
AgmMapControl.propDecorators = {
  position: [{ type: Input }]
};
var AgmFullscreenControl = class extends AgmMapControl {
  getOptions() {
    return {
      fullscreenControl: true,
      fullscreenControlOptions: {
        position: this.position && google.maps.ControlPosition[this.position]
      }
    };
  }
};
AgmFullscreenControl.decorators = [
  { type: Directive, args: [{
    selector: "agm-map agm-fullscreen-control",
    providers: [{ provide: AgmMapControl, useExisting: AgmFullscreenControl }]
  }] }
];
var AgmMapTypeControl = class extends AgmMapControl {
  getOptions() {
    return {
      mapTypeControl: true,
      mapTypeControlOptions: {
        position: this.position && google.maps.ControlPosition[this.position],
        style: this.style && google.maps.MapTypeControlStyle[this.style],
        mapTypeIds: this.mapTypeIds && this.mapTypeIds.map((mapTypeId) => google.maps.MapTypeId[mapTypeId])
      }
    };
  }
};
AgmMapTypeControl.decorators = [
  { type: Directive, args: [{
    selector: "agm-map agm-map-type-control",
    providers: [{ provide: AgmMapControl, useExisting: AgmMapTypeControl }]
  }] }
];
AgmMapTypeControl.propDecorators = {
  mapTypeIds: [{ type: Input }],
  style: [{ type: Input }]
};
var AgmPanControl = class extends AgmMapControl {
  getOptions() {
    return {
      panControl: true,
      panControlOptions: {
        position: this.position && google.maps.ControlPosition[this.position]
      }
    };
  }
};
AgmPanControl.decorators = [
  { type: Directive, args: [{
    selector: "agm-map agm-pan-control",
    providers: [{ provide: AgmMapControl, useExisting: AgmPanControl }]
  }] }
];
var AgmRotateControl = class extends AgmMapControl {
  getOptions() {
    return {
      rotateControl: true,
      rotateControlOptions: {
        position: this.position && google.maps.ControlPosition[this.position]
      }
    };
  }
};
AgmRotateControl.decorators = [
  { type: Directive, args: [{
    selector: "agm-map agm-rotate-control",
    providers: [{ provide: AgmMapControl, useExisting: AgmRotateControl }]
  }] }
];
var AgmScaleControl = class extends AgmMapControl {
  getOptions() {
    return {
      scaleControl: true
    };
  }
};
AgmScaleControl.decorators = [
  { type: Directive, args: [{
    selector: "agm-map agm-scale-control",
    providers: [{ provide: AgmMapControl, useExisting: AgmScaleControl }]
  }] }
];
var AgmStreetViewControl = class extends AgmMapControl {
  getOptions() {
    return {
      streetViewControl: true,
      streetViewControlOptions: {
        position: this.position && google.maps.ControlPosition[this.position]
      }
    };
  }
};
AgmStreetViewControl.decorators = [
  { type: Directive, args: [{
    selector: "agm-map agm-street-view-control",
    providers: [{ provide: AgmMapControl, useExisting: AgmStreetViewControl }]
  }] }
];
var AgmZoomControl = class extends AgmMapControl {
  getOptions() {
    return {
      zoomControl: true,
      zoomControlOptions: {
        position: this.position && google.maps.ControlPosition[this.position],
        style: this.style && google.maps.ZoomControlStyle[this.style]
      }
    };
  }
};
AgmZoomControl.decorators = [
  { type: Directive, args: [{
    selector: "agm-map agm-zoom-control",
    providers: [{ provide: AgmMapControl, useExisting: AgmZoomControl }]
  }] }
];
AgmZoomControl.propDecorators = {
  style: [{ type: Input }]
};
var AgmMap = class _AgmMap {
  constructor(_elem, _mapsWrapper, _platformId, _fitBoundsService, _zone) {
    this._elem = _elem;
    this._mapsWrapper = _mapsWrapper;
    this._platformId = _platformId;
    this._fitBoundsService = _fitBoundsService;
    this._zone = _zone;
    this.longitude = 0;
    this.latitude = 0;
    this.zoom = 8;
    this.draggable = true;
    this.disableDoubleClickZoom = false;
    this.disableDefaultUI = false;
    this.scrollwheel = true;
    this.keyboardShortcuts = true;
    this.styles = [];
    this.usePanning = false;
    this.fitBounds = false;
    this.mapTypeId = "ROADMAP";
    this.clickableIcons = true;
    this.showDefaultInfoWindow = true;
    this.gestureHandling = "auto";
    this.tilt = 0;
    this._observableSubscriptions = [];
    this.mapClick = new EventEmitter();
    this.mapRightClick = new EventEmitter();
    this.mapDblClick = new EventEmitter();
    this.centerChange = new EventEmitter();
    this.boundsChange = new EventEmitter();
    this.mapTypeIdChange = new EventEmitter();
    this.idle = new EventEmitter();
    this.zoomChange = new EventEmitter();
    this.mapReady = new EventEmitter();
    this.tilesLoaded = new EventEmitter();
  }
  /** @internal */
  ngAfterContentInit() {
    if (isPlatformServer(this._platformId)) {
      return;
    }
    const container = this._elem.nativeElement.querySelector(".agm-map-container-inner");
    this._initMapInstance(container);
  }
  _initMapInstance(el) {
    this._mapsWrapper.createMap(el, {
      center: { lat: this.latitude || 0, lng: this.longitude || 0 },
      zoom: this.zoom,
      minZoom: this.minZoom,
      maxZoom: this.maxZoom,
      controlSize: this.controlSize,
      disableDefaultUI: this.disableDefaultUI,
      disableDoubleClickZoom: this.disableDoubleClickZoom,
      scrollwheel: this.scrollwheel,
      backgroundColor: this.backgroundColor,
      draggable: this.draggable,
      draggableCursor: this.draggableCursor,
      draggingCursor: this.draggingCursor,
      keyboardShortcuts: this.keyboardShortcuts,
      styles: this.styles,
      mapTypeId: this.mapTypeId.toLocaleLowerCase(),
      clickableIcons: this.clickableIcons,
      gestureHandling: this.gestureHandling,
      tilt: this.tilt,
      restriction: this.restriction
    }).then(() => this._mapsWrapper.getNativeMap()).then((map2) => this.mapReady.emit(map2));
    this._handleMapCenterChange();
    this._handleMapZoomChange();
    this._handleMapMouseEvents();
    this._handleBoundsChange();
    this._handleMapTypeIdChange();
    this._handleTilesLoadedEvent();
    this._handleIdleEvent();
    this._handleControlChange();
  }
  /** @internal */
  ngOnDestroy() {
    this._observableSubscriptions.forEach((s) => s.unsubscribe());
    this._mapsWrapper.clearInstanceListeners();
    if (this._fitBoundsSubscription) {
      this._fitBoundsSubscription.unsubscribe();
    }
  }
  /* @internal */
  ngOnChanges(changes) {
    this._updateMapOptionsChanges(changes);
    this._updatePosition(changes);
  }
  _updateMapOptionsChanges(changes) {
    const options = {};
    const optionKeys = Object.keys(changes).filter((k) => _AgmMap._mapOptionsAttributes.indexOf(k) !== -1);
    optionKeys.forEach((k) => {
      options[k] = changes[k].currentValue;
    });
    this._mapsWrapper.setMapOptions(options);
  }
  /**
   * Triggers a resize event on the google map instance.
   * When recenter is true, the of the google map gets called with the current lat/lng values or fitBounds value to recenter the map.
   * Returns a promise that gets resolved after the event was triggered.
   */
  triggerResize(recenter = true) {
    return new Promise((resolve) => {
      setTimeout(() => {
        return this._mapsWrapper.triggerMapEvent("resize").then(() => {
          if (recenter) {
            this.fitBounds != null ? this._fitBounds() : this._setCenter();
          }
          resolve();
        });
      });
    });
  }
  _updatePosition(changes) {
    if (changes["latitude"] == null && changes["longitude"] == null && !changes["fitBounds"]) {
      return;
    }
    if ("fitBounds" in changes) {
      this._fitBounds();
      return;
    }
    if (typeof this.latitude !== "number" || typeof this.longitude !== "number") {
      return;
    }
    this._setCenter();
  }
  _setCenter() {
    const newCenter = {
      lat: this.latitude,
      lng: this.longitude
    };
    if (this.usePanning) {
      this._mapsWrapper.panTo(newCenter);
    } else {
      this._mapsWrapper.setCenter(newCenter);
    }
  }
  _fitBounds() {
    switch (this.fitBounds) {
      case true:
        this._subscribeToFitBoundsUpdates();
        break;
      case false:
        if (this._fitBoundsSubscription) {
          this._fitBoundsSubscription.unsubscribe();
        }
        break;
      default:
        if (this._fitBoundsSubscription) {
          this._fitBoundsSubscription.unsubscribe();
        }
        this._updateBounds(this.fitBounds, this.fitBoundsPadding);
    }
  }
  _subscribeToFitBoundsUpdates() {
    this._zone.runOutsideAngular(() => {
      this._fitBoundsSubscription = this._fitBoundsService.getBounds$().subscribe((b) => {
        this._zone.run(() => this._updateBounds(b, this.fitBoundsPadding));
      });
    });
  }
  _updateBounds(bounds, padding) {
    if (!bounds) {
      return;
    }
    if (this._isLatLngBoundsLiteral(bounds) && typeof google !== "undefined" && google && google.maps && google.maps.LatLngBounds) {
      const newBounds = new google.maps.LatLngBounds();
      newBounds.union(bounds);
      bounds = newBounds;
    }
    if (this.usePanning) {
      this._mapsWrapper.panToBounds(bounds, padding);
      return;
    }
    this._mapsWrapper.fitBounds(bounds, padding);
  }
  _isLatLngBoundsLiteral(bounds) {
    return bounds != null && bounds.extend === void 0;
  }
  _handleMapCenterChange() {
    const s = this._mapsWrapper.subscribeToMapEvent("center_changed").subscribe(() => {
      this._mapsWrapper.getCenter().then((center) => {
        this.latitude = center.lat();
        this.longitude = center.lng();
        this.centerChange.emit({ lat: this.latitude, lng: this.longitude });
      });
    });
    this._observableSubscriptions.push(s);
  }
  _handleBoundsChange() {
    const s = this._mapsWrapper.subscribeToMapEvent("bounds_changed").subscribe(() => {
      this._mapsWrapper.getBounds().then((bounds) => {
        this.boundsChange.emit(bounds);
      });
    });
    this._observableSubscriptions.push(s);
  }
  _handleMapTypeIdChange() {
    const s = this._mapsWrapper.subscribeToMapEvent("maptypeid_changed").subscribe(() => {
      this._mapsWrapper.getMapTypeId().then((mapTypeId) => {
        this.mapTypeIdChange.emit(mapTypeId);
      });
    });
    this._observableSubscriptions.push(s);
  }
  _handleMapZoomChange() {
    const s = this._mapsWrapper.subscribeToMapEvent("zoom_changed").subscribe(() => {
      this._mapsWrapper.getZoom().then((z) => {
        this.zoom = z;
        this.zoomChange.emit(z);
      });
    });
    this._observableSubscriptions.push(s);
  }
  _handleIdleEvent() {
    const s = this._mapsWrapper.subscribeToMapEvent("idle").subscribe(() => {
      this.idle.emit(void 0);
    });
    this._observableSubscriptions.push(s);
  }
  _handleTilesLoadedEvent() {
    const s = this._mapsWrapper.subscribeToMapEvent("tilesloaded").subscribe(() => this.tilesLoaded.emit(void 0));
    this._observableSubscriptions.push(s);
  }
  _handleMapMouseEvents() {
    const events = [
      { name: "click", emitter: this.mapClick },
      { name: "rightclick", emitter: this.mapRightClick },
      { name: "dblclick", emitter: this.mapDblClick }
    ];
    events.forEach((e) => {
      const s = this._mapsWrapper.subscribeToMapEvent(e.name).subscribe(([event]) => {
        if (event.placeId && !this.showDefaultInfoWindow) {
          event.stop();
        }
        e.emitter.emit(event);
      });
      this._observableSubscriptions.push(s);
    });
  }
  _handleControlChange() {
    this._setControls();
    this.mapControls.changes.subscribe(() => this._setControls());
  }
  _setControls() {
    const controlOptions = {
      fullscreenControl: !this.disableDefaultUI,
      mapTypeControl: false,
      panControl: false,
      rotateControl: false,
      scaleControl: false,
      streetViewControl: !this.disableDefaultUI,
      zoomControl: !this.disableDefaultUI
    };
    this._mapsWrapper.getNativeMap().then(() => {
      this.mapControls.forEach((control) => Object.assign(controlOptions, control.getOptions()));
      this._mapsWrapper.setMapOptions(controlOptions);
    });
  }
};
AgmMap._mapOptionsAttributes = [
  "disableDoubleClickZoom",
  "scrollwheel",
  "draggable",
  "draggableCursor",
  "draggingCursor",
  "keyboardShortcuts",
  "styles",
  "zoom",
  "minZoom",
  "maxZoom",
  "mapTypeId",
  "clickableIcons",
  "gestureHandling",
  "tilt",
  "restriction"
];
AgmMap.decorators = [
  { type: Component, args: [{
    selector: "agm-map",
    providers: [
      CircleManager,
      DataLayerManager,
      DataLayerManager,
      FitBoundsService,
      GoogleMapsAPIWrapper,
      InfoWindowManager,
      KmlLayerManager,
      LayerManager,
      MarkerManager,
      PolygonManager,
      PolylineManager,
      RectangleManager
    ],
    template: `
              <div class='agm-map-container-inner sebm-google-map-container-inner'></div>
              <div class='agm-map-content'>
                <ng-content></ng-content>
              </div>
  `,
    styles: [`
    .agm-map-container-inner {
      width: inherit;
      height: inherit;
    }
    .agm-map-content {
      display:none;
    }
  `]
  }] }
];
AgmMap.ctorParameters = () => [
  { type: ElementRef },
  { type: GoogleMapsAPIWrapper },
  { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID] }] },
  { type: FitBoundsService },
  { type: NgZone }
];
AgmMap.propDecorators = {
  longitude: [{ type: Input }],
  latitude: [{ type: Input }],
  zoom: [{ type: Input }],
  minZoom: [{ type: Input }],
  maxZoom: [{ type: Input }],
  controlSize: [{ type: Input }],
  draggable: [{ type: Input, args: ["mapDraggable"] }],
  disableDoubleClickZoom: [{ type: Input }],
  disableDefaultUI: [{ type: Input }],
  scrollwheel: [{ type: Input }],
  backgroundColor: [{ type: Input }],
  draggableCursor: [{ type: Input }],
  draggingCursor: [{ type: Input }],
  keyboardShortcuts: [{ type: Input }],
  styles: [{ type: Input }],
  usePanning: [{ type: Input }],
  fitBounds: [{ type: Input }],
  fitBoundsPadding: [{ type: Input }],
  mapTypeId: [{ type: Input }],
  clickableIcons: [{ type: Input }],
  showDefaultInfoWindow: [{ type: Input }],
  gestureHandling: [{ type: Input }],
  tilt: [{ type: Input }],
  restriction: [{ type: Input }],
  mapClick: [{ type: Output }],
  mapRightClick: [{ type: Output }],
  mapDblClick: [{ type: Output }],
  centerChange: [{ type: Output }],
  boundsChange: [{ type: Output }],
  mapTypeIdChange: [{ type: Output }],
  idle: [{ type: Output }],
  zoomChange: [{ type: Output }],
  mapReady: [{ type: Output }],
  tilesLoaded: [{ type: Output }],
  mapControls: [{ type: ContentChildren, args: [AgmMapControl] }]
};
var markerId = 0;
var AgmMarker = class {
  constructor(_markerManager) {
    this._markerManager = _markerManager;
    this.draggable = false;
    this.visible = true;
    this.openInfoWindow = true;
    this.opacity = 1;
    this.zIndex = 1;
    this.clickable = true;
    this.animationChange = new EventEmitter();
    this.markerClick = new EventEmitter();
    this.markerDblClick = new EventEmitter();
    this.markerRightClick = new EventEmitter();
    this.dragStart = new EventEmitter();
    this.drag = new EventEmitter();
    this.dragEnd = new EventEmitter();
    this.mouseOver = new EventEmitter();
    this.mouseOut = new EventEmitter();
    this.infoWindow = new QueryList();
    this._markerAddedToManger = false;
    this._observableSubscriptions = [];
    this._fitBoundsDetails$ = new ReplaySubject(1);
    this._id = (markerId++).toString();
  }
  /* @internal */
  ngAfterContentInit() {
    this.handleInfoWindowUpdate();
    this.infoWindow.changes.subscribe(() => this.handleInfoWindowUpdate());
  }
  handleInfoWindowUpdate() {
    if (this.infoWindow.length > 1) {
      throw new Error("Expected no more than one info window.");
    }
    this.infoWindow.forEach((marker) => {
      marker.hostMarker = this;
    });
  }
  /** @internal */
  ngOnChanges(changes) {
    if (typeof this.latitude === "string") {
      this.latitude = Number(this.latitude);
    }
    if (typeof this.longitude === "string") {
      this.longitude = Number(this.longitude);
    }
    if (typeof this.latitude !== "number" || typeof this.longitude !== "number") {
      return;
    }
    if (!this._markerAddedToManger) {
      this._markerManager.addMarker(this);
      this._updateFitBoundsDetails();
      this._markerAddedToManger = true;
      this._addEventListeners();
      return;
    }
    if (changes["latitude"] || changes["longitude"]) {
      this._markerManager.updateMarkerPosition(this);
      this._updateFitBoundsDetails();
    }
    if (changes["title"]) {
      this._markerManager.updateTitle(this);
    }
    if (changes["label"]) {
      this._markerManager.updateLabel(this);
    }
    if (changes["draggable"]) {
      this._markerManager.updateDraggable(this);
    }
    if (changes["iconUrl"]) {
      this._markerManager.updateIcon(this);
    }
    if (changes["opacity"]) {
      this._markerManager.updateOpacity(this);
    }
    if (changes["visible"]) {
      this._markerManager.updateVisible(this);
    }
    if (changes["zIndex"]) {
      this._markerManager.updateZIndex(this);
    }
    if (changes["clickable"]) {
      this._markerManager.updateClickable(this);
    }
    if (changes["animation"]) {
      this._markerManager.updateAnimation(this);
    }
  }
  /** @internal */
  getFitBoundsDetails$() {
    return this._fitBoundsDetails$.asObservable();
  }
  _updateFitBoundsDetails() {
    this._fitBoundsDetails$.next({ latLng: { lat: this.latitude, lng: this.longitude } });
  }
  _addEventListeners() {
    const cs = this._markerManager.createEventObservable("click", this).subscribe(() => {
      if (this.openInfoWindow) {
        this.infoWindow.forEach((infoWindow) => infoWindow.open());
      }
      this.markerClick.emit(this);
    });
    this._observableSubscriptions.push(cs);
    const dcs = this._markerManager.createEventObservable("dblclick", this).subscribe(() => {
      this.markerDblClick.emit(null);
    });
    this._observableSubscriptions.push(dcs);
    const rc = this._markerManager.createEventObservable("rightclick", this).subscribe(() => {
      this.markerRightClick.emit(null);
    });
    this._observableSubscriptions.push(rc);
    const ds = this._markerManager.createEventObservable("dragstart", this).subscribe((e) => this.dragStart.emit(e));
    this._observableSubscriptions.push(ds);
    const d = this._markerManager.createEventObservable("drag", this).subscribe((e) => this.drag.emit(e));
    this._observableSubscriptions.push(d);
    const de = this._markerManager.createEventObservable("dragend", this).subscribe((e) => this.dragEnd.emit(e));
    this._observableSubscriptions.push(de);
    const mover = this._markerManager.createEventObservable("mouseover", this).subscribe((e) => this.mouseOver.emit(e));
    this._observableSubscriptions.push(mover);
    const mout = this._markerManager.createEventObservable("mouseout", this).subscribe((e) => this.mouseOut.emit(e));
    this._observableSubscriptions.push(mout);
    const anChng = this._markerManager.createEventObservable("animation_changed", this).subscribe(() => {
      this.animationChange.emit(this.animation);
    });
    this._observableSubscriptions.push(anChng);
  }
  /** @internal */
  id() {
    return this._id;
  }
  /** @internal */
  toString() {
    return "AgmMarker-" + this._id.toString();
  }
  /** @internal */
  ngOnDestroy() {
    this._markerManager.deleteMarker(this);
    this._observableSubscriptions.forEach((s) => s.unsubscribe());
  }
};
AgmMarker.decorators = [
  { type: Directive, args: [{
    selector: "agm-marker",
    providers: [
      { provide: FitBoundsAccessor, useExisting: forwardRef(() => AgmMarker) }
    ]
  }] }
];
AgmMarker.ctorParameters = () => [
  { type: MarkerManager }
];
AgmMarker.propDecorators = {
  latitude: [{ type: Input }],
  longitude: [{ type: Input }],
  title: [{ type: Input }],
  label: [{ type: Input }],
  draggable: [{ type: Input, args: ["markerDraggable"] }],
  iconUrl: [{ type: Input }],
  visible: [{ type: Input }],
  openInfoWindow: [{ type: Input }],
  opacity: [{ type: Input }],
  zIndex: [{ type: Input }],
  clickable: [{ type: Input, args: ["markerClickable"] }],
  animation: [{ type: Input }],
  animationChange: [{ type: Output }],
  markerClick: [{ type: Output }],
  markerDblClick: [{ type: Output }],
  markerRightClick: [{ type: Output }],
  dragStart: [{ type: Output }],
  drag: [{ type: Output }],
  dragEnd: [{ type: Output }],
  mouseOver: [{ type: Output }],
  mouseOut: [{ type: Output }],
  infoWindow: [{ type: ContentChildren, args: [AgmInfoWindow] }]
};
var AgmPolygon = class _AgmPolygon {
  constructor(_polygonManager) {
    this._polygonManager = _polygonManager;
    this.clickable = true;
    this.draggable = false;
    this.editable = false;
    this.geodesic = false;
    this.paths = [];
    this.polyClick = new EventEmitter();
    this.polyDblClick = new EventEmitter();
    this.polyDrag = new EventEmitter();
    this.polyDragEnd = new EventEmitter();
    this.polyDragStart = new EventEmitter();
    this.polyMouseDown = new EventEmitter();
    this.polyMouseMove = new EventEmitter();
    this.polyMouseOut = new EventEmitter();
    this.polyMouseOver = new EventEmitter();
    this.polyMouseUp = new EventEmitter();
    this.polyRightClick = new EventEmitter();
    this.polyPathsChange = new EventEmitter();
    this._polygonAddedToManager = false;
    this._subscriptions = [];
  }
  /** @internal */
  ngAfterContentInit() {
    if (!this._polygonAddedToManager) {
      this._init();
    }
  }
  ngOnChanges(changes) {
    if (!this._polygonAddedToManager) {
      this._init();
      return;
    }
    this._polygonManager.setPolygonOptions(this, this._updatePolygonOptions(changes));
  }
  _init() {
    this._polygonManager.addPolygon(this);
    this._polygonAddedToManager = true;
    this._addEventListeners();
  }
  _addEventListeners() {
    const handlers = [
      { name: "click", handler: (ev) => this.polyClick.emit(ev) },
      { name: "dblclick", handler: (ev) => this.polyDblClick.emit(ev) },
      { name: "drag", handler: (ev) => this.polyDrag.emit(ev) },
      { name: "dragend", handler: (ev) => this.polyDragEnd.emit(ev) },
      { name: "dragstart", handler: (ev) => this.polyDragStart.emit(ev) },
      { name: "mousedown", handler: (ev) => this.polyMouseDown.emit(ev) },
      { name: "mousemove", handler: (ev) => this.polyMouseMove.emit(ev) },
      { name: "mouseout", handler: (ev) => this.polyMouseOut.emit(ev) },
      { name: "mouseover", handler: (ev) => this.polyMouseOver.emit(ev) },
      { name: "mouseup", handler: (ev) => this.polyMouseUp.emit(ev) },
      { name: "rightclick", handler: (ev) => this.polyRightClick.emit(ev) }
    ];
    handlers.forEach((obj) => {
      const os = this._polygonManager.createEventObservable(obj.name, this).subscribe(obj.handler);
      this._subscriptions.push(os);
    });
    this._polygonManager.createPathEventObservable(this).then((paths$) => {
      const os = paths$.subscribe((pathEvent) => this.polyPathsChange.emit(pathEvent));
      this._subscriptions.push(os);
    });
  }
  _updatePolygonOptions(changes) {
    return Object.keys(changes).filter((k) => _AgmPolygon._polygonOptionsAttributes.indexOf(k) !== -1).reduce((obj, k) => {
      obj[k] = changes[k].currentValue;
      return obj;
    }, {});
  }
  /** @internal */
  id() {
    return this._id;
  }
  /** @internal */
  ngOnDestroy() {
    this._polygonManager.deletePolygon(this);
    this._subscriptions.forEach((s) => s.unsubscribe());
  }
  getPath() {
    return this._polygonManager.getPath(this);
  }
  getPaths() {
    return this._polygonManager.getPaths(this);
  }
};
AgmPolygon._polygonOptionsAttributes = [
  "clickable",
  "draggable",
  "editable",
  "fillColor",
  "fillOpacity",
  "geodesic",
  "icon",
  "map",
  "paths",
  "strokeColor",
  "strokeOpacity",
  "strokeWeight",
  "visible",
  "zIndex",
  "draggable",
  "editable",
  "visible"
];
AgmPolygon.decorators = [
  { type: Directive, args: [{
    selector: "agm-polygon"
  }] }
];
AgmPolygon.ctorParameters = () => [
  { type: PolygonManager }
];
AgmPolygon.propDecorators = {
  clickable: [{ type: Input }],
  draggable: [{ type: Input, args: ["polyDraggable"] }],
  editable: [{ type: Input }],
  fillColor: [{ type: Input }],
  fillOpacity: [{ type: Input }],
  geodesic: [{ type: Input }],
  paths: [{ type: Input }],
  strokeColor: [{ type: Input }],
  strokeOpacity: [{ type: Input }],
  strokeWeight: [{ type: Input }],
  visible: [{ type: Input }],
  zIndex: [{ type: Input }],
  polyClick: [{ type: Output }],
  polyDblClick: [{ type: Output }],
  polyDrag: [{ type: Output }],
  polyDragEnd: [{ type: Output }],
  polyDragStart: [{ type: Output }],
  polyMouseDown: [{ type: Output }],
  polyMouseMove: [{ type: Output }],
  polyMouseOut: [{ type: Output }],
  polyMouseOver: [{ type: Output }],
  polyMouseUp: [{ type: Output }],
  polyRightClick: [{ type: Output }],
  polyPathsChange: [{ type: Output }]
};
var AgmPolylineIcon = class {
  ngOnInit() {
    if (this.path == null) {
      throw new Error("Icon Sequence path is required");
    }
  }
};
AgmPolylineIcon.decorators = [
  { type: Directive, args: [{ selector: "agm-polyline agm-icon-sequence" }] }
];
AgmPolylineIcon.propDecorators = {
  fixedRotation: [{ type: Input }],
  offset: [{ type: Input }],
  repeat: [{ type: Input }],
  anchorX: [{ type: Input }],
  anchorY: [{ type: Input }],
  fillColor: [{ type: Input }],
  fillOpacity: [{ type: Input }],
  path: [{ type: Input }],
  rotation: [{ type: Input }],
  scale: [{ type: Input }],
  strokeColor: [{ type: Input }],
  strokeOpacity: [{ type: Input }],
  strokeWeight: [{ type: Input }]
};
var AgmPolylinePoint = class {
  constructor() {
    this.positionChanged = new EventEmitter();
  }
  ngOnChanges(changes) {
    if (changes["latitude"] || changes["longitude"]) {
      this.positionChanged.emit({
        lat: changes["latitude"] ? changes["latitude"].currentValue : this.latitude,
        lng: changes["longitude"] ? changes["longitude"].currentValue : this.longitude
      });
    }
  }
  /** @internal */
  getFitBoundsDetails$() {
    return this.positionChanged.pipe(startWith({ lat: this.latitude, lng: this.longitude }), map((position) => ({ latLng: position })));
  }
};
AgmPolylinePoint.decorators = [
  { type: Directive, args: [{
    selector: "agm-polyline-point",
    providers: [
      { provide: FitBoundsAccessor, useExisting: forwardRef(() => AgmPolylinePoint) }
    ]
  }] }
];
AgmPolylinePoint.ctorParameters = () => [];
AgmPolylinePoint.propDecorators = {
  latitude: [{ type: Input }],
  longitude: [{ type: Input }],
  positionChanged: [{ type: Output }]
};
var polylineId = 0;
var AgmPolyline = class _AgmPolyline {
  constructor(_polylineManager) {
    this._polylineManager = _polylineManager;
    this.clickable = true;
    this.draggable = false;
    this.editable = false;
    this.geodesic = false;
    this.visible = true;
    this.lineClick = new EventEmitter();
    this.lineDblClick = new EventEmitter();
    this.lineDrag = new EventEmitter();
    this.lineDragEnd = new EventEmitter();
    this.lineDragStart = new EventEmitter();
    this.lineMouseDown = new EventEmitter();
    this.lineMouseMove = new EventEmitter();
    this.lineMouseOut = new EventEmitter();
    this.lineMouseOver = new EventEmitter();
    this.lineMouseUp = new EventEmitter();
    this.lineRightClick = new EventEmitter();
    this.polyPathChange = new EventEmitter();
    this._polylineAddedToManager = false;
    this._subscriptions = [];
    this._id = (polylineId++).toString();
  }
  /** @internal */
  ngAfterContentInit() {
    if (this.points.length) {
      this.points.forEach((point) => {
        const s = point.positionChanged.subscribe(() => {
          this._polylineManager.updatePolylinePoints(this);
        });
        this._subscriptions.push(s);
      });
    }
    if (!this._polylineAddedToManager) {
      this._init();
    }
    const pointSub = this.points.changes.subscribe(() => this._polylineManager.updatePolylinePoints(this));
    this._subscriptions.push(pointSub);
    this._polylineManager.updatePolylinePoints(this);
    const iconSub = this.iconSequences.changes.subscribe(() => this._polylineManager.updateIconSequences(this));
    this._subscriptions.push(iconSub);
  }
  ngOnChanges(changes) {
    if (!this._polylineAddedToManager) {
      this._init();
      return;
    }
    const options = {};
    const optionKeys = Object.keys(changes).filter((k) => _AgmPolyline._polylineOptionsAttributes.indexOf(k) !== -1);
    optionKeys.forEach((k) => options[k] = changes[k].currentValue);
    this._polylineManager.setPolylineOptions(this, options);
  }
  getPath() {
    return this._polylineManager.getPath(this);
  }
  _init() {
    this._polylineManager.addPolyline(this);
    this._polylineAddedToManager = true;
    this._addEventListeners();
  }
  _addEventListeners() {
    const handlers = [
      { name: "click", handler: (ev) => this.lineClick.emit(ev) },
      { name: "dblclick", handler: (ev) => this.lineDblClick.emit(ev) },
      { name: "drag", handler: (ev) => this.lineDrag.emit(ev) },
      { name: "dragend", handler: (ev) => this.lineDragEnd.emit(ev) },
      { name: "dragstart", handler: (ev) => this.lineDragStart.emit(ev) },
      { name: "mousedown", handler: (ev) => this.lineMouseDown.emit(ev) },
      { name: "mousemove", handler: (ev) => this.lineMouseMove.emit(ev) },
      { name: "mouseout", handler: (ev) => this.lineMouseOut.emit(ev) },
      { name: "mouseover", handler: (ev) => this.lineMouseOver.emit(ev) },
      { name: "mouseup", handler: (ev) => this.lineMouseUp.emit(ev) },
      { name: "rightclick", handler: (ev) => this.lineRightClick.emit(ev) }
    ];
    handlers.forEach((obj) => {
      const os = this._polylineManager.createEventObservable(obj.name, this).subscribe(obj.handler);
      this._subscriptions.push(os);
    });
    this._polylineManager.createPathEventObservable(this).then((ob$) => {
      const os = ob$.subscribe((pathEvent) => this.polyPathChange.emit(pathEvent));
      this._subscriptions.push(os);
    });
  }
  /** @internal */
  _getPoints() {
    if (this.points) {
      return this.points.toArray();
    }
    return [];
  }
  _getIcons() {
    if (this.iconSequences) {
      return this.iconSequences.toArray();
    }
    return [];
  }
  /** @internal */
  id() {
    return this._id;
  }
  /** @internal */
  ngOnDestroy() {
    this._polylineManager.deletePolyline(this);
    this._subscriptions.forEach((s) => s.unsubscribe());
  }
};
AgmPolyline._polylineOptionsAttributes = [
  "draggable",
  "editable",
  "visible",
  "geodesic",
  "strokeColor",
  "strokeOpacity",
  "strokeWeight",
  "zIndex"
];
AgmPolyline.decorators = [
  { type: Directive, args: [{
    selector: "agm-polyline"
  }] }
];
AgmPolyline.ctorParameters = () => [
  { type: PolylineManager }
];
AgmPolyline.propDecorators = {
  clickable: [{ type: Input }],
  draggable: [{ type: Input, args: ["polylineDraggable"] }],
  editable: [{ type: Input }],
  geodesic: [{ type: Input }],
  strokeColor: [{ type: Input }],
  strokeOpacity: [{ type: Input }],
  strokeWeight: [{ type: Input }],
  visible: [{ type: Input }],
  zIndex: [{ type: Input }],
  lineClick: [{ type: Output }],
  lineDblClick: [{ type: Output }],
  lineDrag: [{ type: Output }],
  lineDragEnd: [{ type: Output }],
  lineDragStart: [{ type: Output }],
  lineMouseDown: [{ type: Output }],
  lineMouseMove: [{ type: Output }],
  lineMouseOut: [{ type: Output }],
  lineMouseOver: [{ type: Output }],
  lineMouseUp: [{ type: Output }],
  lineRightClick: [{ type: Output }],
  polyPathChange: [{ type: Output }],
  points: [{ type: ContentChildren, args: [AgmPolylinePoint] }],
  iconSequences: [{ type: ContentChildren, args: [AgmPolylineIcon] }]
};
var AgmRectangle = class _AgmRectangle {
  constructor(_manager) {
    this._manager = _manager;
    this.clickable = true;
    this.draggable = false;
    this.editable = false;
    this.strokePosition = "CENTER";
    this.strokeWeight = 0;
    this.visible = true;
    this.boundsChange = new EventEmitter();
    this.rectangleClick = new EventEmitter();
    this.rectangleDblClick = new EventEmitter();
    this.drag = new EventEmitter();
    this.dragEnd = new EventEmitter();
    this.dragStart = new EventEmitter();
    this.mouseDown = new EventEmitter();
    this.mouseMove = new EventEmitter();
    this.mouseOut = new EventEmitter();
    this.mouseOver = new EventEmitter();
    this.mouseUp = new EventEmitter();
    this.rightClick = new EventEmitter();
    this._rectangleAddedToManager = false;
    this._eventSubscriptions = [];
  }
  /** @internal */
  ngOnInit() {
    this._manager.addRectangle(this);
    this._rectangleAddedToManager = true;
    this._registerEventListeners();
  }
  /** @internal */
  ngOnChanges(changes) {
    if (!this._rectangleAddedToManager) {
      return;
    }
    if (changes["north"] || changes["east"] || changes["south"] || changes["west"]) {
      this._manager.setBounds(this);
    }
    if (changes["editable"]) {
      this._manager.setEditable(this);
    }
    if (changes["draggable"]) {
      this._manager.setDraggable(this);
    }
    if (changes["visible"]) {
      this._manager.setVisible(this);
    }
    this._updateRectangleOptionsChanges(changes);
  }
  _updateRectangleOptionsChanges(changes) {
    const options = {};
    const optionKeys = Object.keys(changes).filter((k) => _AgmRectangle._mapOptions.indexOf(k) !== -1);
    optionKeys.forEach((k) => {
      options[k] = changes[k].currentValue;
    });
    if (optionKeys.length > 0) {
      this._manager.setOptions(this, options);
    }
  }
  _registerEventListeners() {
    const events = /* @__PURE__ */ new Map();
    events.set("bounds_changed", this.boundsChange);
    events.set("click", this.rectangleClick);
    events.set("dblclick", this.rectangleDblClick);
    events.set("drag", this.drag);
    events.set("dragend", this.dragEnd);
    events.set("dragStart", this.dragStart);
    events.set("mousedown", this.mouseDown);
    events.set("mousemove", this.mouseMove);
    events.set("mouseout", this.mouseOut);
    events.set("mouseover", this.mouseOver);
    events.set("mouseup", this.mouseUp);
    events.set("rightclick", this.rightClick);
    events.forEach((eventEmitter, eventName) => {
      this._eventSubscriptions.push(this._manager.createEventObservable(eventName, this).subscribe((value) => {
        switch (eventName) {
          case "bounds_changed":
            this._manager.getBounds(this).then((bounds) => eventEmitter.emit({
              north: bounds.getNorthEast().lat(),
              east: bounds.getNorthEast().lng(),
              south: bounds.getSouthWest().lat(),
              west: bounds.getSouthWest().lng()
            }));
            break;
          default:
            eventEmitter.emit(value);
        }
      }));
    });
  }
  /** @internal */
  ngOnDestroy() {
    this._eventSubscriptions.forEach((s) => s.unsubscribe());
    this._eventSubscriptions = null;
    this._manager.removeRectangle(this);
  }
  /**
   * Gets the LatLngBounds of this Rectangle.
   */
  getBounds() {
    return this._manager.getBounds(this);
  }
};
AgmRectangle._mapOptions = [
  "fillColor",
  "fillOpacity",
  "strokeColor",
  "strokeOpacity",
  "strokePosition",
  "strokeWeight",
  "visible",
  "zIndex",
  "clickable"
];
AgmRectangle.decorators = [
  { type: Directive, args: [{
    selector: "agm-rectangle"
  }] }
];
AgmRectangle.ctorParameters = () => [
  { type: RectangleManager }
];
AgmRectangle.propDecorators = {
  north: [{ type: Input }],
  east: [{ type: Input }],
  south: [{ type: Input }],
  west: [{ type: Input }],
  clickable: [{ type: Input }],
  draggable: [{ type: Input, args: ["rectangleDraggable"] }],
  editable: [{ type: Input }],
  fillColor: [{ type: Input }],
  fillOpacity: [{ type: Input }],
  strokeColor: [{ type: Input }],
  strokeOpacity: [{ type: Input }],
  strokePosition: [{ type: Input }],
  strokeWeight: [{ type: Input }],
  visible: [{ type: Input }],
  zIndex: [{ type: Input }],
  boundsChange: [{ type: Output }],
  rectangleClick: [{ type: Output }],
  rectangleDblClick: [{ type: Output }],
  drag: [{ type: Output }],
  dragEnd: [{ type: Output }],
  dragStart: [{ type: Output }],
  mouseDown: [{ type: Output }],
  mouseMove: [{ type: Output }],
  mouseOut: [{ type: Output }],
  mouseOver: [{ type: Output }],
  mouseUp: [{ type: Output }],
  rightClick: [{ type: Output }]
};
var layerId$3 = 0;
var AgmTransitLayer = class {
  constructor(_manager) {
    this._manager = _manager;
    this._addedToManager = false;
    this._id = (layerId$3++).toString();
    this.visible = true;
  }
  ngOnInit() {
    if (this._addedToManager) {
      return;
    }
    this._manager.addTransitLayer(this);
    this._addedToManager = true;
  }
  /** @internal */
  id() {
    return this._id;
  }
  /** @internal */
  toString() {
    return `AgmTransitLayer-${this._id.toString()}`;
  }
  /** @internal */
  ngOnDestroy() {
    this._manager.deleteLayer(this);
  }
};
AgmTransitLayer.decorators = [
  { type: Directive, args: [{
    selector: "agm-transit-layer"
  }] }
];
AgmTransitLayer.ctorParameters = () => [
  { type: LayerManager }
];
AgmTransitLayer.propDecorators = {
  visible: [{ type: Input }]
};
function coreDirectives() {
  return [
    AgmBicyclingLayer,
    AgmCircle,
    AgmDataLayer,
    AgmFitBounds,
    AgmFullscreenControl,
    AgmInfoWindow,
    AgmKmlLayer,
    AgmMap,
    AgmMapTypeControl,
    AgmMarker,
    AgmPanControl,
    AgmPolygon,
    AgmPolyline,
    AgmPolylineIcon,
    AgmPolylinePoint,
    AgmRectangle,
    AgmRotateControl,
    AgmScaleControl,
    AgmStreetViewControl,
    AgmTransitLayer,
    AgmZoomControl
  ];
}
var AgmCoreModule = class _AgmCoreModule {
  /**
   * Please use this method when you register the module at the root level.
   */
  static forRoot(lazyMapsAPILoaderConfig) {
    return {
      ngModule: _AgmCoreModule,
      providers: [
        ...BROWSER_GLOBALS_PROVIDERS,
        { provide: MapsAPILoader, useClass: LazyMapsAPILoader },
        { provide: LAZY_MAPS_API_CONFIG, useValue: lazyMapsAPILoaderConfig }
      ]
    };
  }
};
AgmCoreModule.decorators = [
  { type: NgModule, args: [{ declarations: coreDirectives(), exports: coreDirectives() }] }
];
export {
  AgmBicyclingLayer,
  AgmCircle,
  AgmCoreModule,
  AgmDataLayer,
  AgmFitBounds,
  AgmFullscreenControl,
  AgmGeocoder,
  AgmInfoWindow,
  AgmKmlLayer,
  AgmMap,
  AgmMapTypeControl,
  AgmMarker,
  AgmPanControl,
  AgmPolygon,
  AgmPolyline,
  AgmPolylineIcon,
  AgmPolylinePoint,
  AgmRectangle,
  AgmRotateControl,
  AgmScaleControl,
  AgmStreetViewControl,
  AgmTransitLayer,
  AgmZoomControl,
  CircleManager,
  DataLayerManager,
  FitBoundsAccessor,
  GoogleMapsAPIWrapper,
  GoogleMapsScriptProtocol,
  InfoWindowManager,
  KmlLayerManager,
  LAZY_MAPS_API_CONFIG,
  LayerManager,
  LazyMapsAPILoader,
  MapsAPILoader,
  MarkerManager,
  NoOpMapsAPILoader,
  PolygonManager,
  PolylineManager,
  RectangleManager,
  coreDirectives,
  FitBoundsService as ɵa,
  AgmMapControl as ɵb,
  WindowRef as ɵc,
  DocumentRef as ɵd,
  BROWSER_GLOBALS_PROVIDERS as ɵe
};
//# sourceMappingURL=@agm_core.js.map
