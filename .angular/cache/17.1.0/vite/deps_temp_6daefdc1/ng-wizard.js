import {
  CommonModule
} from "./chunk-LVUAMDWL.js";
import {
  Component,
  ComponentFactoryResolver$1,
  ContentChildren,
  Directive,
  EventEmitter,
  HostBinding,
  Inject,
  Injectable,
  InjectionToken,
  Input,
  NgModule,
  Optional,
  Output,
  QueryList,
  Type,
  ViewChild,
  ViewContainerRef,
  forwardRef,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-R32D6M7N.js";
import {
  isObservable
} from "./chunk-GFVJDENN.js";
import "./chunk-QOAHSALO.js";
import {
  Subject,
  of
} from "./chunk-LOA65BFQ.js";
import "./chunk-ASLTLD6L.js";

// node_modules/ng-wizard/node_modules/tslib/tslib.es6.js
var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2)
      if (b2.hasOwnProperty(p))
        d2[p] = b2[p];
  };
  return extendStatics(d, b);
};
function __extends(d, b) {
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function() {
  __assign = Object.assign || function __assign2(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __param(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
}
function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
    return Reflect.metadata(metadataKey, metadataValue);
}
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m)
    return m.call(o);
  if (o && typeof o.length === "number")
    return {
      next: function() {
        if (o && i >= o.length)
          o = void 0;
        return { value: o && o[i++], done: !o };
      }
    };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

// node_modules/ng-wizard/fesm5/ng-wizard.js
var TOOLBAR_POSITION;
(function(TOOLBAR_POSITION2) {
  TOOLBAR_POSITION2["none"] = "none";
  TOOLBAR_POSITION2["top"] = "top";
  TOOLBAR_POSITION2["bottom"] = "bottom";
  TOOLBAR_POSITION2["both"] = "both";
})(TOOLBAR_POSITION || (TOOLBAR_POSITION = {}));
var TOOLBAR_BUTTON_POSITION;
(function(TOOLBAR_BUTTON_POSITION2) {
  TOOLBAR_BUTTON_POSITION2["start"] = "start";
  TOOLBAR_BUTTON_POSITION2["end"] = "end";
})(TOOLBAR_BUTTON_POSITION || (TOOLBAR_BUTTON_POSITION = {}));
var THEME;
(function(THEME2) {
  THEME2["default"] = "default";
  THEME2["arrows"] = "arrows";
  THEME2["circles"] = "circles";
  THEME2["dots"] = "dots";
})(THEME || (THEME = {}));
var STEP_STATE;
(function(STEP_STATE2) {
  STEP_STATE2["normal"] = "normal";
  STEP_STATE2["disabled"] = "disabled";
  STEP_STATE2["error"] = "error";
  STEP_STATE2["hidden"] = "hidden";
})(STEP_STATE || (STEP_STATE = {}));
var STEP_STATUS;
(function(STEP_STATUS2) {
  STEP_STATUS2["untouched"] = "untouched";
  STEP_STATUS2["done"] = "done";
  STEP_STATUS2["active"] = "active";
})(STEP_STATUS || (STEP_STATUS = {}));
var STEP_DIRECTIN;
(function(STEP_DIRECTIN2) {
  STEP_DIRECTIN2["forward"] = "forward";
  STEP_DIRECTIN2["backward"] = "backward";
})(STEP_DIRECTIN || (STEP_DIRECTIN = {}));
var STEP_POSITION;
(function(STEP_POSITION2) {
  STEP_POSITION2["first"] = "first";
  STEP_POSITION2["final"] = "final";
  STEP_POSITION2["middle"] = "middle";
})(STEP_POSITION || (STEP_POSITION = {}));
var DEFAULT_CONFIG = {
  selected: 0,
  keyNavigation: true,
  cycleSteps: false,
  lang: {
    next: "Next",
    previous: "Previous"
  },
  toolbarSettings: {
    toolbarPosition: TOOLBAR_POSITION.bottom,
    toolbarButtonPosition: TOOLBAR_BUTTON_POSITION.end,
    showNextButton: true,
    showPreviousButton: true,
    toolbarExtraButtons: []
  },
  anchorSettings: {
    anchorClickable: true,
    enableAllAnchors: false,
    markDoneStep: true,
    markAllPreviousStepsAsDone: true,
    removeDoneStepOnNavigateBack: false,
    enableAnchorOnDoneStep: true
  },
  theme: THEME.default
};
var NG_WIZARD_CONFIG_TOKEN = new InjectionToken("ngWizardCustom.config");
function merge(target, source) {
  var e_1, _a;
  try {
    for (var _b = __values(Object.keys(source)), _c = _b.next(); !_c.done; _c = _b.next()) {
      var key = _c.value;
      if (source[key] instanceof Object && key in target) {
        Object.assign(source[key], merge(target[key], source[key]));
      }
    }
  } catch (e_1_1) {
    e_1 = { error: e_1_1 };
  } finally {
    try {
      if (_c && !_c.done && (_a = _b.return))
        _a.call(_b);
    } finally {
      if (e_1)
        throw e_1.error;
    }
  }
  Object.assign(target || {}, source);
  return target;
}
var NgWizardDataService = (
  /** @class */
  function() {
    function NgWizardDataService2(config) {
      this.config = config;
      this._defaultConfig = __assign({}, DEFAULT_CONFIG);
      if (this.config) {
        this._defaultConfig = merge(this._defaultConfig, this.config);
      }
      this._resetWizard = new Subject();
      this._showNextStep = new Subject();
      this._showPreviousStep = new Subject();
      this._showStep = new Subject();
      this._setTheme = new Subject();
      this._stepChangedArgs = new Subject();
      this.resetWizard$ = this._resetWizard.asObservable();
      this.showNextStep$ = this._showNextStep.asObservable();
      this.showPreviousStep$ = this._showPreviousStep.asObservable();
      this.showStep$ = this._showStep.asObservable();
      this.setTheme$ = this._setTheme.asObservable();
      this.stepChangedArgs$ = this._stepChangedArgs.asObservable();
    }
    NgWizardDataService2.prototype.getDefaultConfig = function() {
      return __assign({}, this._defaultConfig);
    };
    NgWizardDataService2.prototype.resetWizard = function() {
      this._resetWizard.next();
    };
    NgWizardDataService2.prototype.showNextStep = function() {
      this._showNextStep.next();
    };
    NgWizardDataService2.prototype.showPreviousStep = function() {
      this._showPreviousStep.next();
    };
    NgWizardDataService2.prototype.showStep = function(index) {
      this._showStep.next(index);
    };
    NgWizardDataService2.prototype.setTheme = function(theme) {
      this._setTheme.next(theme);
    };
    NgWizardDataService2.prototype.stepChanged = function(args) {
      this._stepChangedArgs.next(args);
    };
    NgWizardDataService2.ctorParameters = function() {
      return [
        { type: void 0, decorators: [{ type: Optional }, { type: Inject, args: [NG_WIZARD_CONFIG_TOKEN] }] }
      ];
    };
    NgWizardDataService2.ɵprov = ɵɵdefineInjectable({ factory: function NgWizardDataService_Factory() {
      return new NgWizardDataService2(ɵɵinject(NG_WIZARD_CONFIG_TOKEN, 8));
    }, token: NgWizardDataService2, providedIn: "root" });
    NgWizardDataService2 = __decorate([
      Injectable({
        providedIn: "root"
      }),
      __param(0, Optional()),
      __param(0, Inject(NG_WIZARD_CONFIG_TOKEN)),
      __metadata("design:paramtypes", [Object])
    ], NgWizardDataService2);
    return NgWizardDataService2;
  }()
);
var NgWizardService = (
  /** @class */
  function() {
    function NgWizardService2(ngWizardDataService) {
      this.ngWizardDataService = ngWizardDataService;
    }
    NgWizardService2.prototype.reset = function() {
      this.ngWizardDataService.resetWizard();
    };
    NgWizardService2.prototype.next = function() {
      this.ngWizardDataService.showNextStep();
    };
    NgWizardService2.prototype.previous = function() {
      this.ngWizardDataService.showPreviousStep();
    };
    NgWizardService2.prototype.show = function(index) {
      this.ngWizardDataService.showStep(index);
    };
    NgWizardService2.prototype.theme = function(theme) {
      this.ngWizardDataService.setTheme(theme);
    };
    NgWizardService2.prototype.stepChanged = function() {
      return this.ngWizardDataService.stepChangedArgs$;
    };
    NgWizardService2.ctorParameters = function() {
      return [
        { type: NgWizardDataService }
      ];
    };
    NgWizardService2.ɵprov = ɵɵdefineInjectable({ factory: function NgWizardService_Factory() {
      return new NgWizardService2(ɵɵinject(NgWizardDataService));
    }, token: NgWizardService2, providedIn: "root" });
    NgWizardService2 = __decorate([
      Injectable({
        providedIn: "root"
      }),
      __metadata("design:paramtypes", [NgWizardDataService])
    ], NgWizardService2);
    return NgWizardService2;
  }()
);
var NgWizardStep = (
  /** @class */
  function() {
    function NgWizardStep2() {
    }
    Object.defineProperty(NgWizardStep2.prototype, "hidden", {
      get: function() {
        return this.status != STEP_STATUS.active;
      },
      enumerable: true,
      configurable: true
    });
    __decorate([
      Input(),
      __metadata("design:type", String)
    ], NgWizardStep2.prototype, "title", void 0);
    __decorate([
      Input(),
      __metadata("design:type", String)
    ], NgWizardStep2.prototype, "description", void 0);
    __decorate([
      Input(),
      __metadata("design:type", String)
    ], NgWizardStep2.prototype, "state", void 0);
    __decorate([
      Input(),
      __metadata("design:type", Type)
    ], NgWizardStep2.prototype, "component", void 0);
    __decorate([
      Input(),
      __metadata("design:type", Object)
    ], NgWizardStep2.prototype, "canEnter", void 0);
    __decorate([
      Input(),
      __metadata("design:type", Object)
    ], NgWizardStep2.prototype, "canExit", void 0);
    __decorate([
      HostBinding("hidden"),
      __metadata("design:type", Boolean),
      __metadata("design:paramtypes", [])
    ], NgWizardStep2.prototype, "hidden", null);
    NgWizardStep2 = __decorate([
      Directive()
    ], NgWizardStep2);
    return NgWizardStep2;
  }()
);
var NgWizardStepContentDirective = (
  /** @class */
  function() {
    function NgWizardStepContentDirective2(viewContainerRef) {
      this.viewContainerRef = viewContainerRef;
    }
    NgWizardStepContentDirective2.ctorParameters = function() {
      return [
        { type: ViewContainerRef }
      ];
    };
    NgWizardStepContentDirective2 = __decorate([
      Directive({
        selector: "[ngWizardStepContent]"
      }),
      __metadata("design:paramtypes", [ViewContainerRef])
    ], NgWizardStepContentDirective2);
    return NgWizardStepContentDirective2;
  }()
);
var NgWizardStepComponent = (
  /** @class */
  function(_super) {
    __extends(NgWizardStepComponent2, _super);
    function NgWizardStepComponent2(componentFactoryResolver) {
      var _this = _super.call(this) || this;
      _this.componentFactoryResolver = componentFactoryResolver;
      return _this;
    }
    NgWizardStepComponent_1 = NgWizardStepComponent2;
    NgWizardStepComponent2.prototype.ngOnInit = function() {
      this.loadComponent();
    };
    NgWizardStepComponent2.prototype.loadComponent = function() {
      if (!this.component) {
        return;
      }
      var componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.component);
      this.stepContent.viewContainerRef.clear();
      this.componentRef = this.stepContent.viewContainerRef.createComponent(componentFactory);
    };
    Object.defineProperty(NgWizardStepComponent2.prototype, "isHidden", {
      get: function() {
        return this.state == STEP_STATE.hidden;
      },
      enumerable: true,
      configurable: true
    });
    var NgWizardStepComponent_1;
    NgWizardStepComponent2.ctorParameters = function() {
      return [
        { type: ComponentFactoryResolver$1 }
      ];
    };
    __decorate([
      ViewChild(NgWizardStepContentDirective, { static: true }),
      __metadata("design:type", NgWizardStepContentDirective)
    ], NgWizardStepComponent2.prototype, "stepContent", void 0);
    NgWizardStepComponent2 = NgWizardStepComponent_1 = __decorate([
      Component({
        selector: "ng-wizard-step",
        template: '<div class="tab-pane step-content" style="display: block">\r\n    <ng-content></ng-content>\r\n    <ng-template ngWizardStepContent></ng-template>\r\n</div>',
        providers: [
          { provide: NgWizardStep, useExisting: forwardRef(function() {
            return NgWizardStepComponent_1;
          }) }
        ],
        styles: [""]
      }),
      __metadata("design:paramtypes", [ComponentFactoryResolver$1])
    ], NgWizardStepComponent2);
    return NgWizardStepComponent2;
  }(NgWizardStep)
);
var NgWizardComponent = (
  /** @class */
  function() {
    function NgWizardComponent2(ngWizardDataService) {
      this.ngWizardDataService = ngWizardDataService;
      this.stepChanged = new EventEmitter();
      this.themeChanged = new EventEmitter();
      this.reseted = new EventEmitter();
      this.styles = {};
      this.showToolbarTop = false;
      this.showPreviousButton = false;
      this.showNextButton = false;
      this.showToolbarBottom = false;
      this.showExtraButtons = false;
      this.currentStepIndex = null;
    }
    Object.defineProperty(NgWizardComponent2.prototype, "pConfig", {
      get: function() {
        return this._pConfig || {};
      },
      set: function(config) {
        this._pConfig = config;
      },
      enumerable: true,
      configurable: true
    });
    NgWizardComponent2.prototype.ngAfterContentInit = function() {
      var _this = this;
      this._backupStepStates();
      this._init();
      this._setToolbar();
      this._setEvents();
      this.resetWizardWatcher = this.ngWizardDataService.resetWizard$.subscribe(function() {
        return _this._reset();
      });
      this.showNextStepWatcher = this.ngWizardDataService.showNextStep$.subscribe(function() {
        return _this._showNextStep();
      });
      this.showPreviousStepWatcher = this.ngWizardDataService.showPreviousStep$.subscribe(function() {
        return _this._showPreviousStep();
      });
      this.showStepWatcher = this.ngWizardDataService.showStep$.subscribe(function(index) {
        return _this._showStep(index);
      });
      this.setThemeWatcher = this.ngWizardDataService.setTheme$.subscribe(function(theme) {
        return _this._setTheme(theme);
      });
    };
    NgWizardComponent2.prototype._init = function() {
      var defaultConfig = this.ngWizardDataService.getDefaultConfig();
      this.config = merge(defaultConfig, this.pConfig);
      this._initSteps();
      this._initStyles();
      this._showStep(this.config.selected);
    };
    NgWizardComponent2.prototype._initSteps = function() {
      var _this = this;
      this.steps.forEach(function(step, index) {
        step.index = index;
        step.status = step.status || STEP_STATUS.untouched;
        step.state = step.state || STEP_STATE.normal;
      });
      if (this.config.selected > 0 && this.config.anchorSettings.markDoneStep && this.config.anchorSettings.markAllPreviousStepsAsDone) {
        this.steps.forEach(function(step) {
          if (step.state != STEP_STATE.disabled && step.state != STEP_STATE.hidden) {
            step.status = step.index < _this.config.selected ? STEP_STATUS.done : step.status;
          }
        });
      }
    };
    NgWizardComponent2.prototype._backupStepStates = function() {
      this.steps.forEach(function(step) {
        step.initialStatus = step.status;
        step.initialState = step.state;
      });
    };
    NgWizardComponent2.prototype._restoreStepStates = function() {
      this.steps.forEach(function(step) {
        step.status = step.initialStatus;
        step.state = step.initialState;
      });
    };
    NgWizardComponent2.prototype._initStyles = function() {
      this.styles.main = "ng-wizard-main ng-wizard-theme-" + this.config.theme;
      this.styles.step = "nav-item";
      if (this.config.anchorSettings.enableAllAnchors && this.config.anchorSettings.anchorClickable) {
        this.styles.step += " clickable";
      }
      this.styles.toolbarTop = "btn-toolbar ng-wizard-toolbar ng-wizard-toolbar-top justify-content-" + this.config.toolbarSettings.toolbarButtonPosition;
      this.styles.toolbarBottom = "btn-toolbar ng-wizard-toolbar ng-wizard-toolbar-bottom justify-content-" + this.config.toolbarSettings.toolbarButtonPosition;
      this.styles.previousButton = "btn btn-secondary ng-wizard-btn-prev";
      this.styles.nextButton = "btn btn-secondary ng-wizard-btn-next";
    };
    NgWizardComponent2.prototype._setToolbar = function() {
      this.showToolbarTop = this.config.toolbarSettings.toolbarPosition == TOOLBAR_POSITION.top || this.config.toolbarSettings.toolbarPosition == TOOLBAR_POSITION.both;
      this.showToolbarBottom = this.config.toolbarSettings.toolbarPosition == TOOLBAR_POSITION.bottom || this.config.toolbarSettings.toolbarPosition == TOOLBAR_POSITION.both;
      this.showPreviousButton = this.config.toolbarSettings.showPreviousButton;
      this.showNextButton = this.config.toolbarSettings.showNextButton;
      this.showExtraButtons = this.config.toolbarSettings.toolbarExtraButtons && this.config.toolbarSettings.toolbarExtraButtons.length > 0;
    };
    NgWizardComponent2.prototype._setEvents = function() {
      if (this.config.keyNavigation) {
      }
    };
    NgWizardComponent2.prototype._getStepCssClass = function(selectedStep) {
      var stepClass = this.styles.step;
      switch (selectedStep.state) {
        case STEP_STATE.disabled:
          stepClass += " disabled";
          break;
        case STEP_STATE.error:
          stepClass += " danger";
          break;
        case STEP_STATE.hidden:
          stepClass += " hidden";
          break;
      }
      switch (selectedStep.status) {
        case STEP_STATUS.done:
          stepClass += " done";
          break;
        case STEP_STATUS.active:
          stepClass += " active";
          break;
      }
      return stepClass;
    };
    NgWizardComponent2.prototype._showSelectedStep = function(event, selectedStep) {
      event.preventDefault();
      if (!this.config.anchorSettings.anchorClickable) {
        return;
      }
      if (!this.config.anchorSettings.enableAnchorOnDoneStep && selectedStep.status == STEP_STATUS.done) {
        return true;
      }
      if (selectedStep.index != this.currentStepIndex) {
        if (this.config.anchorSettings.enableAllAnchors && this.config.anchorSettings.anchorClickable) {
          this._showStep(selectedStep.index);
        } else {
          if (selectedStep.status == STEP_STATUS.done) {
            this._showStep(selectedStep.index);
          }
        }
      }
    };
    NgWizardComponent2.prototype._showNextStep = function(event) {
      var _this = this;
      if (event) {
        event.preventDefault();
      }
      var filteredSteps = this.steps.filter(function(step) {
        return step.index > (_this.currentStepIndex == null ? -1 : _this.currentStepIndex) && step.state != STEP_STATE.disabled && step.state != STEP_STATE.hidden;
      });
      if (filteredSteps.length == 0) {
        if (!this.config.cycleSteps) {
          return;
        }
        this._showStep(0);
      } else {
        this._showStep(filteredSteps.shift().index);
      }
    };
    NgWizardComponent2.prototype._showPreviousStep = function(event) {
      var _this = this;
      if (event) {
        event.preventDefault();
      }
      var filteredSteps = this.steps.filter(function(step) {
        return step.index < (_this.currentStepIndex == null && _this.config.cycleSteps ? _this.steps.length : _this.currentStepIndex) && step.state != STEP_STATE.disabled && step.state != STEP_STATE.hidden;
      });
      if (filteredSteps.length == 0) {
        if (!this.config.cycleSteps) {
          return;
        }
        this._showStep(this.steps.length - 1);
      } else {
        this._showStep(filteredSteps.pop().index);
      }
    };
    NgWizardComponent2.prototype._showStep = function(selectedStepIndex) {
      var _this = this;
      if (selectedStepIndex >= this.steps.length || selectedStepIndex < 0) {
        return;
      }
      if (selectedStepIndex == this.currentStepIndex) {
        return;
      }
      var selectedStep = this.steps.toArray()[selectedStepIndex];
      if (selectedStep.state == STEP_STATE.disabled || selectedStep.state == STEP_STATE.hidden) {
        return;
      }
      this._showLoader();
      return this._isStepChangeValid(selectedStep, this.currentStep && this.currentStep.canExit).toPromise().then(function(isValid) {
        if (isValid) {
          return _this._isStepChangeValid(selectedStep, selectedStep.canEnter).toPromise();
        }
        return of(isValid).toPromise();
      }).then(function(isValid) {
        if (isValid) {
          _this._loadStepContent(selectedStep);
        }
      }).finally(function() {
        return _this._hideLoader();
      });
    };
    NgWizardComponent2.prototype._isStepChangeValid = function(selectedStep, condition) {
      if (typeof condition === "boolean") {
        return of(condition);
      } else if (condition instanceof Function) {
        var direction = this._getStepDirection(selectedStep.index);
        var result = condition({ direction, fromStep: this.currentStep, toStep: selectedStep });
        if (isObservable(result)) {
          return result;
        } else if (typeof result === "boolean") {
          return of(result);
        } else {
          return of(false);
        }
      }
      return of(true);
    };
    NgWizardComponent2.prototype._loadStepContent = function(selectedStep) {
      this._setAnchor(selectedStep);
      this._setButtons(selectedStep.index);
      var args = {
        step: selectedStep,
        previousStep: this.currentStep,
        direction: this._getStepDirection(selectedStep.index),
        position: this._getStepPosition(selectedStep.index)
      };
      this.stepChanged.emit(args);
      this.ngWizardDataService.stepChanged(args);
      this.currentStepIndex = selectedStep.index;
      this.currentStep = selectedStep;
    };
    NgWizardComponent2.prototype._setAnchor = function(selectedStep) {
      if (this.currentStep) {
        this.currentStep.status = STEP_STATUS.untouched;
        if (this.config.anchorSettings.markDoneStep) {
          this.currentStep.status = STEP_STATUS.done;
          if (this.config.anchorSettings.removeDoneStepOnNavigateBack) {
            this.steps.forEach(function(step) {
              if (step.index > selectedStep.index) {
                step.status = STEP_STATUS.untouched;
              }
            });
          }
        }
      }
      selectedStep.status = STEP_STATUS.active;
    };
    NgWizardComponent2.prototype._setButtons = function(index) {
      if (!this.config.cycleSteps) {
        if (0 >= index) {
          this.styles.previousButton = "btn btn-secondary ng-wizard-btn-prev disabled";
        } else {
          this.styles.previousButton = "btn btn-secondary ng-wizard-btn-prev";
        }
        if (this.steps.length - 1 <= index) {
          this.styles.nextButton = "btn btn-secondary ng-wizard-btn-next disabled";
        } else {
          this.styles.nextButton = "btn btn-secondary ng-wizard-btn-next";
        }
      }
    };
    NgWizardComponent2.prototype._extraButtonClicked = function(button) {
      if (button.event) {
        button.event();
      }
    };
    NgWizardComponent2.prototype._keyNav = function(event) {
      switch (event.which) {
        case 37:
          this._showPreviousStep(event);
          event.preventDefault();
          break;
        case 39:
          this._showNextStep(event);
          event.preventDefault();
          break;
        default:
          return;
      }
    };
    NgWizardComponent2.prototype._showLoader = function() {
      this.styles.main = "ng-wizard-main ng-wizard-theme-" + this.config.theme + " ng-wizard-loading";
    };
    NgWizardComponent2.prototype._hideLoader = function() {
      this.styles.main = "ng-wizard-main ng-wizard-theme-" + this.config.theme;
    };
    NgWizardComponent2.prototype._getStepDirection = function(selectedStepIndex) {
      return this.currentStepIndex != null && this.currentStepIndex != selectedStepIndex ? this.currentStepIndex < selectedStepIndex ? STEP_DIRECTIN.forward : STEP_DIRECTIN.backward : null;
    };
    NgWizardComponent2.prototype._getStepPosition = function(selectedStepIndex) {
      return selectedStepIndex == 0 ? STEP_POSITION.first : selectedStepIndex == this.steps.length - 1 ? STEP_POSITION.final : STEP_POSITION.middle;
    };
    NgWizardComponent2.prototype._setTheme = function(theme) {
      if (this.config.theme == theme) {
        return false;
      }
      this.config.theme = theme;
      this.styles.main = "ng-wizard-main ng-wizard-theme-" + this.config.theme;
      this.themeChanged.emit(this.config.theme);
    };
    NgWizardComponent2.prototype._reset = function() {
      this.currentStepIndex = null;
      this.currentStep = null;
      this._restoreStepStates();
      this._init();
      this.reseted.emit();
    };
    NgWizardComponent2.prototype.ngOnDestroy = function() {
      if (this.resetWizardWatcher) {
        this.resetWizardWatcher.unsubscribe();
      }
      if (this.showNextStepWatcher) {
        this.showNextStepWatcher.unsubscribe();
      }
      if (this.showPreviousStepWatcher) {
        this.showPreviousStepWatcher.unsubscribe();
      }
      if (this.showStepWatcher) {
        this.showStepWatcher.unsubscribe();
      }
      if (this.setThemeWatcher) {
        this.setThemeWatcher.unsubscribe();
      }
    };
    NgWizardComponent2.ctorParameters = function() {
      return [
        { type: NgWizardDataService }
      ];
    };
    __decorate([
      ContentChildren(NgWizardStep),
      __metadata("design:type", QueryList)
    ], NgWizardComponent2.prototype, "steps", void 0);
    __decorate([
      Input("config"),
      __metadata("design:type", Object),
      __metadata("design:paramtypes", [Object])
    ], NgWizardComponent2.prototype, "pConfig", null);
    __decorate([
      Output(),
      __metadata("design:type", Object)
    ], NgWizardComponent2.prototype, "stepChanged", void 0);
    __decorate([
      Output(),
      __metadata("design:type", Object)
    ], NgWizardComponent2.prototype, "themeChanged", void 0);
    __decorate([
      Output(),
      __metadata("design:type", Object)
    ], NgWizardComponent2.prototype, "reseted", void 0);
    NgWizardComponent2 = __decorate([
      Component({
        selector: "ng-wizard",
        template: '<div id="ngwizard" [ngClass]="styles.main">\r\n    <ul class="nav nav-tabs step-anchor">\r\n        <li *ngFor="let step of steps; let i = index" [ngClass]="_getStepCssClass(step)">\r\n            <a href="#step-{{ i }}" (click)="_showSelectedStep($event, step)" *ngIf="!step.isHidden"\r\n                class="nav-link">{{ step.title }}<br /><small>{{ step.description }}</small></a>\r\n        </li>\r\n    </ul>\r\n\r\n    <div *ngIf="showToolbarTop" [ngClass]="styles.toolbarTop">\r\n        <div class="btn-group mr-2 ng-wizard-btn-group" role="group">\r\n            <button *ngIf="showPreviousButton" [ngClass]="styles.previousButton" type="button"\r\n                (click)="_showPreviousStep($event)">{{ config!.lang!.previous }}</button>\r\n            <button *ngIf="showNextButton" [ngClass]="styles.nextButton" type="button"\r\n                (click)="_showNextStep($event)">{{ config!.lang!.next }}</button>\r\n        </div>\r\n\r\n        <div *ngIf="showExtraButtons" class="btn-group mr-2 ng-wizard-btn-group-extra" role="group">\r\n            <button *ngFor="let button of config!.toolbarSettings!.toolbarExtraButtons; let j = index"\r\n                [ngClass]="button.class" type="button" (click)="_extraButtonClicked(button)">{{ button.text }}</button>\r\n        </div>\r\n    </div>\r\n\r\n    <div class="ng-wizard-container tab-content">\r\n        <ng-content></ng-content>\r\n    </div>\r\n\r\n    <div *ngIf="showToolbarBottom" [ngClass]="styles.toolbarBottom">\r\n        <div class="btn-group mr-2 ng-wizard-btn-group" role="group">\r\n            <button *ngIf="showPreviousButton" [ngClass]="styles.previousButton" type="button"\r\n                (click)="_showPreviousStep($event)">{{ config!.lang!.previous }}</button>\r\n            <button *ngIf="showNextButton" [ngClass]="styles.nextButton" type="button"\r\n                (click)="_showNextStep($event)">{{ config!.lang!.next }}</button>\r\n        </div>\r\n\r\n        <div *ngIf="showExtraButtons" class="btn-group mr-2 ng-wizard-btn-group-extra" role="group">\r\n            <button *ngFor="let button of config!.toolbarSettings!.toolbarExtraButtons; let j = index"\r\n                [ngClass]="button.class" type="button" (click)="_extraButtonClicked(button)">{{ button.text }}</button>\r\n        </div>\r\n    </div>\r\n</div>',
        styles: [""]
      }),
      __metadata("design:paramtypes", [NgWizardDataService])
    ], NgWizardComponent2);
    return NgWizardComponent2;
  }()
);
var NgWizardModule = (
  /** @class */
  function() {
    function NgWizardModule2() {
    }
    NgWizardModule_1 = NgWizardModule2;
    NgWizardModule2.forRoot = function(ngWizardConfig) {
      return {
        ngModule: NgWizardModule_1,
        providers: [
          {
            provide: NG_WIZARD_CONFIG_TOKEN,
            useValue: ngWizardConfig
          }
        ]
      };
    };
    var NgWizardModule_1;
    NgWizardModule2 = NgWizardModule_1 = __decorate([
      NgModule({
        imports: [CommonModule],
        declarations: [NgWizardComponent, NgWizardStepComponent, NgWizardStepContentDirective],
        exports: [NgWizardComponent, NgWizardStepComponent]
      })
    ], NgWizardModule2);
    return NgWizardModule2;
  }()
);
export {
  NgWizardComponent,
  NgWizardModule,
  NgWizardService,
  NgWizardStep,
  NgWizardStepComponent,
  STEP_DIRECTIN,
  STEP_POSITION,
  STEP_STATE,
  THEME,
  TOOLBAR_BUTTON_POSITION,
  TOOLBAR_POSITION,
  NgWizardDataService as ɵa,
  NG_WIZARD_CONFIG_TOKEN as ɵb,
  NgWizardStepContentDirective as ɵc
};
/*! Bundled license information:

tslib/tslib.es6.js:
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)
*/
//# sourceMappingURL=ng-wizard.js.map
