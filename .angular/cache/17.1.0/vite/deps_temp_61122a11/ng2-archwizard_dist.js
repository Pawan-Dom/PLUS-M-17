import {
  CommonModule
} from "./chunk-SMCDLPSA.js";
import {
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  EventEmitter,
  Host,
  HostBinding,
  HostListener,
  Injectable,
  Input,
  NgModule,
  Optional,
  Output,
  TemplateRef,
  forwardRef
} from "./chunk-VMTA5F7E.js";
import "./chunk-HHK6Q7EG.js";
import "./chunk-EEKLJX6I.js";
import "./chunk-XUSQUK27.js";
import "./chunk-AOF462FV.js";
import {
  __commonJS,
  __toESM
} from "./chunk-ASLTLD6L.js";

// browser-external:util
var require_util = __commonJS({
  "browser-external:util"(exports, module) {
    module.exports = Object.create(new Proxy({}, {
      get(_, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          console.warn(`Module "util" has been externalized for browser compatibility. Cannot access "util.${key}" in client code. See https://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
        }
      }
    }));
  }
});

// node_modules/ng2-archwizard/dist/directives/wizard-step-title.directive.js
var WizardStepTitleDirective = (
  /** @class */
  function() {
    function WizardStepTitleDirective2(templateRef) {
      this.templateRef = templateRef;
    }
    WizardStepTitleDirective2.decorators = [
      { type: Directive, args: [{
        selector: "ng-template[stepTitle], ng-template[wizardStepTitle]"
      }] }
    ];
    WizardStepTitleDirective2.ctorParameters = function() {
      return [
        { type: TemplateRef }
      ];
    };
    return WizardStepTitleDirective2;
  }()
);

// node_modules/ng2-archwizard/dist/util/wizard-step.interface.js
var import_util = __toESM(require_util());
var WizardStep = (
  /** @class */
  function() {
    function WizardStep2() {
      this.navigationSymbol = "";
      this.completed = false;
      this.selected = false;
      this.defaultSelected = false;
      this.optional = false;
      this.canEnter = true;
      this.canExit = true;
      this.stepEnter = new EventEmitter();
      this.stepExit = new EventEmitter();
    }
    Object.defineProperty(WizardStep2.prototype, "hidden", {
      /**
       * Returns if this wizard step should be visible to the user.
       * If the step should be visible to the user false is returned, otherwise true
       *
       * @returns {boolean}
       */
      get: function() {
        return !this.selected;
      },
      enumerable: true,
      configurable: true
    });
    WizardStep2.canTransitionStep = function(condition, direction) {
      if ((0, import_util.isBoolean)(condition)) {
        return Promise.resolve(condition);
      } else if (condition instanceof Function) {
        return Promise.resolve(condition(direction));
      } else {
        return Promise.reject(new Error("Input value '" + condition + "' is neither a boolean nor a function"));
      }
    };
    WizardStep2.prototype.enter = function(direction) {
      this.stepEnter.emit(direction);
    };
    WizardStep2.prototype.exit = function(direction) {
      this.stepExit.emit(direction);
    };
    WizardStep2.prototype.canEnterStep = function(direction) {
      return WizardStep2.canTransitionStep(this.canEnter, direction);
    };
    WizardStep2.prototype.canExitStep = function(direction) {
      return WizardStep2.canTransitionStep(this.canExit, direction);
    };
    WizardStep2.propDecorators = {
      "stepTitleTemplate": [{ type: ContentChild, args: [WizardStepTitleDirective] }],
      "stepTitle": [{ type: Input }],
      "navigationSymbol": [{ type: Input }],
      "navigationSymbolFontFamily": [{ type: Input }],
      "canEnter": [{ type: Input }],
      "canExit": [{ type: Input }],
      "stepEnter": [{ type: Output }],
      "stepExit": [{ type: Output }],
      "hidden": [{ type: HostBinding, args: ["hidden"] }]
    };
    return WizardStep2;
  }()
);

// node_modules/ng2-archwizard/dist/util/moving-direction.enum.js
var MovingDirection;
(function(MovingDirection2) {
  MovingDirection2[MovingDirection2["Forwards"] = 0] = "Forwards";
  MovingDirection2[MovingDirection2["Backwards"] = 1] = "Backwards";
  MovingDirection2[MovingDirection2["Stay"] = 2] = "Stay";
})(MovingDirection || (MovingDirection = {}));

// node_modules/ng2-archwizard/dist/navigation/navigation-mode.interface.js
var NavigationMode = (
  /** @class */
  function() {
    function NavigationMode2(wizardState) {
      this.wizardState = wizardState;
    }
    NavigationMode2.prototype.goToPreviousStep = function(preFinalize, postFinalize) {
      if (this.wizardState.hasPreviousStep()) {
        this.goToStep(this.wizardState.currentStepIndex - 1, preFinalize, postFinalize);
      }
    };
    NavigationMode2.prototype.goToNextStep = function(preFinalize, postFinalize) {
      if (this.wizardState.hasNextStep()) {
        this.goToStep(this.wizardState.currentStepIndex + 1, preFinalize, postFinalize);
      }
    };
    return NavigationMode2;
  }()
);

// node_modules/ng2-archwizard/dist/navigation/free-navigation-mode.js
var __extends = function() {
  var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
    d.__proto__ = b;
  } || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var FreeNavigationMode = (
  /** @class */
  function(_super) {
    __extends(FreeNavigationMode2, _super);
    function FreeNavigationMode2(wizardState) {
      return _super.call(this, wizardState) || this;
    }
    FreeNavigationMode2.prototype.canGoToStep = function(destinationIndex) {
      var _this = this;
      var hasStep = this.wizardState.hasStep(destinationIndex);
      var movingDirection = this.wizardState.getMovingDirection(destinationIndex);
      var canExitCurrentStep = function(previous) {
        return previous ? _this.wizardState.currentStep.canExitStep(movingDirection) : Promise.resolve(false);
      };
      var canEnterDestinationStep = function(previous) {
        return previous ? _this.wizardState.getStepAtIndex(destinationIndex).canEnterStep(movingDirection) : Promise.resolve(false);
      };
      return Promise.resolve(hasStep).then(canExitCurrentStep).then(canEnterDestinationStep);
    };
    FreeNavigationMode2.prototype.goToStep = function(destinationIndex, preFinalize, postFinalize) {
      var _this = this;
      this.canGoToStep(destinationIndex).then(function(navigationAllowed) {
        if (navigationAllowed) {
          var movingDirection = _this.wizardState.getMovingDirection(destinationIndex);
          if (preFinalize) {
            preFinalize.emit();
          }
          _this.wizardState.currentStep.completed = true;
          _this.wizardState.currentStep.exit(movingDirection);
          _this.wizardState.currentStep.selected = false;
          _this.wizardState.currentStepIndex = destinationIndex;
          _this.wizardState.currentStep.enter(movingDirection);
          _this.wizardState.currentStep.selected = true;
          if (postFinalize) {
            postFinalize.emit();
          }
        } else {
          _this.wizardState.currentStep.exit(MovingDirection.Stay);
          _this.wizardState.currentStep.enter(MovingDirection.Stay);
        }
      });
    };
    FreeNavigationMode2.prototype.isNavigable = function(destinationIndex) {
      return true;
    };
    FreeNavigationMode2.prototype.reset = function() {
      if (!this.wizardState.hasStep(this.wizardState.defaultStepIndex)) {
        throw new Error("The wizard doesn't contain a step with index " + this.wizardState.defaultStepIndex);
      }
      this.wizardState.wizardSteps.forEach(function(step) {
        step.completed = false;
        step.selected = false;
      });
      this.wizardState.currentStepIndex = this.wizardState.defaultStepIndex;
      this.wizardState.currentStep.selected = true;
      this.wizardState.currentStep.enter(MovingDirection.Forwards);
    };
    return FreeNavigationMode2;
  }(NavigationMode)
);

// node_modules/ng2-archwizard/dist/util/wizard-completion-step.interface.js
var __extends2 = function() {
  var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
    d.__proto__ = b;
  } || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var WizardCompletionStep = (
  /** @class */
  function(_super) {
    __extends2(WizardCompletionStep2, _super);
    function WizardCompletionStep2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.stepExit = new EventEmitter();
      _this.canExit = false;
      return _this;
    }
    WizardCompletionStep2.prototype.enter = function(direction) {
      this.completed = true;
      this.stepEnter.emit(direction);
    };
    WizardCompletionStep2.prototype.exit = function(direction) {
      this.completed = false;
      this.stepExit.emit(direction);
    };
    return WizardCompletionStep2;
  }(WizardStep)
);

// node_modules/ng2-archwizard/dist/navigation/semi-strict-navigation-mode.js
var __extends3 = function() {
  var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
    d.__proto__ = b;
  } || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var SemiStrictNavigationMode = (
  /** @class */
  function(_super) {
    __extends3(SemiStrictNavigationMode2, _super);
    function SemiStrictNavigationMode2(wizardState) {
      return _super.call(this, wizardState) || this;
    }
    SemiStrictNavigationMode2.prototype.canGoToStep = function(destinationIndex) {
      var _this = this;
      var hasStep = this.wizardState.hasStep(destinationIndex);
      var movingDirection = this.wizardState.getMovingDirection(destinationIndex);
      var canExitCurrentStep = function(previous) {
        return previous ? _this.wizardState.currentStep.canExitStep(movingDirection) : Promise.resolve(false);
      };
      var canEnterDestinationStep = function(previous) {
        return previous ? _this.wizardState.getStepAtIndex(destinationIndex).canEnterStep(movingDirection) : Promise.resolve(false);
      };
      var destinationStep = function(previous) {
        if (previous) {
          var allNormalStepsCompleted = _this.wizardState.wizardSteps.filter(function(step, index) {
            return index < destinationIndex;
          }).every(function(step) {
            return step.completed || step.optional || step.selected;
          });
          return Promise.resolve(!(_this.wizardState.getStepAtIndex(destinationIndex) instanceof WizardCompletionStep) || allNormalStepsCompleted);
        } else {
          return Promise.resolve(false);
        }
      };
      return Promise.resolve(hasStep).then(canExitCurrentStep).then(canEnterDestinationStep).then(destinationStep);
    };
    SemiStrictNavigationMode2.prototype.goToStep = function(destinationIndex, preFinalize, postFinalize) {
      var _this = this;
      this.canGoToStep(destinationIndex).then(function(navigationAllowed) {
        if (navigationAllowed) {
          var movingDirection = _this.wizardState.getMovingDirection(destinationIndex);
          if (preFinalize) {
            preFinalize.emit();
          }
          _this.wizardState.currentStep.completed = true;
          _this.wizardState.currentStep.exit(movingDirection);
          _this.wizardState.currentStep.selected = false;
          _this.wizardState.currentStepIndex = destinationIndex;
          _this.wizardState.currentStep.enter(movingDirection);
          _this.wizardState.currentStep.selected = true;
          if (postFinalize) {
            postFinalize.emit();
          }
        } else {
          _this.wizardState.currentStep.exit(MovingDirection.Stay);
          _this.wizardState.currentStep.enter(MovingDirection.Stay);
        }
      });
    };
    SemiStrictNavigationMode2.prototype.isNavigable = function(destinationIndex) {
      if (this.wizardState.getStepAtIndex(destinationIndex) instanceof WizardCompletionStep) {
        return this.wizardState.wizardSteps.filter(function(step, index) {
          return index < destinationIndex;
        }).every(function(step) {
          return step.completed || step.optional || step.selected;
        });
      } else {
        return true;
      }
    };
    SemiStrictNavigationMode2.prototype.reset = function() {
      if (!this.wizardState.hasStep(this.wizardState.defaultStepIndex)) {
        throw new Error("The wizard doesn't contain a step with index " + this.wizardState.defaultStepIndex);
      }
      var defaultCompletionStep = this.wizardState.getStepAtIndex(this.wizardState.defaultStepIndex) instanceof WizardCompletionStep && this.wizardState.wizardSteps.length !== 1;
      if (defaultCompletionStep) {
        throw new Error("The default step index " + this.wizardState.defaultStepIndex + " references a completion step");
      }
      this.wizardState.wizardSteps.forEach(function(step) {
        step.completed = false;
        step.selected = false;
      });
      this.wizardState.currentStepIndex = this.wizardState.defaultStepIndex;
      this.wizardState.currentStep.selected = true;
      this.wizardState.currentStep.enter(MovingDirection.Forwards);
    };
    return SemiStrictNavigationMode2;
  }(NavigationMode)
);

// node_modules/ng2-archwizard/dist/navigation/strict-navigation-mode.js
var __extends4 = function() {
  var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
    d.__proto__ = b;
  } || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var StrictNavigationMode = (
  /** @class */
  function(_super) {
    __extends4(StrictNavigationMode2, _super);
    function StrictNavigationMode2(wizardState) {
      return _super.call(this, wizardState) || this;
    }
    StrictNavigationMode2.prototype.canGoToStep = function(destinationIndex) {
      var _this = this;
      var hasStep = this.wizardState.hasStep(destinationIndex);
      var movingDirection = this.wizardState.getMovingDirection(destinationIndex);
      var canExitCurrentStep = function(previous) {
        return previous ? _this.wizardState.currentStep.canExitStep(movingDirection) : Promise.resolve(false);
      };
      var canEnterDestinationStep = function(previous) {
        return previous ? _this.wizardState.getStepAtIndex(destinationIndex).canEnterStep(movingDirection) : Promise.resolve(false);
      };
      var allPreviousStepsComplete = function(previous) {
        if (previous) {
          return Promise.resolve(_this.wizardState.wizardSteps.filter(function(step, index) {
            return index < destinationIndex && index !== _this.wizardState.currentStepIndex;
          }).every(function(step) {
            return step.completed || step.optional;
          }));
        } else {
          return Promise.resolve(false);
        }
      };
      return Promise.resolve(hasStep).then(canExitCurrentStep).then(canEnterDestinationStep).then(allPreviousStepsComplete);
    };
    StrictNavigationMode2.prototype.goToStep = function(destinationIndex, preFinalize, postFinalize) {
      var _this = this;
      this.canGoToStep(destinationIndex).then(function(navigationAllowed) {
        if (navigationAllowed) {
          var movingDirection = _this.wizardState.getMovingDirection(destinationIndex);
          if (preFinalize) {
            preFinalize.emit();
          }
          _this.wizardState.currentStep.completed = true;
          _this.wizardState.currentStep.exit(movingDirection);
          _this.wizardState.currentStep.selected = false;
          _this.wizardState.wizardSteps.filter(function(step, index) {
            return _this.wizardState.currentStepIndex > destinationIndex && index > destinationIndex;
          }).forEach(function(step) {
            return step.completed = false;
          });
          _this.wizardState.currentStepIndex = destinationIndex;
          _this.wizardState.currentStep.enter(movingDirection);
          _this.wizardState.currentStep.selected = true;
          if (postFinalize) {
            postFinalize.emit();
          }
        } else {
          _this.wizardState.currentStep.exit(MovingDirection.Stay);
          _this.wizardState.currentStep.enter(MovingDirection.Stay);
        }
      });
    };
    StrictNavigationMode2.prototype.isNavigable = function(destinationIndex) {
      return destinationIndex < this.wizardState.currentStepIndex;
    };
    StrictNavigationMode2.prototype.reset = function() {
      var _this = this;
      if (!this.wizardState.hasStep(this.wizardState.defaultStepIndex)) {
        throw new Error("The wizard doesn't contain a step with index " + this.wizardState.defaultStepIndex);
      }
      var illegalDefaultStep = this.wizardState.wizardSteps.filter(function(step, index) {
        return index < _this.wizardState.defaultStepIndex;
      }).some(function(step) {
        return !step.optional;
      });
      if (illegalDefaultStep) {
        throw new Error("The default step index " + this.wizardState.defaultStepIndex + " is located after a non optional step");
      }
      this.wizardState.wizardSteps.forEach(function(step) {
        step.completed = false;
        step.selected = false;
      });
      this.wizardState.currentStepIndex = this.wizardState.defaultStepIndex;
      this.wizardState.currentStep.selected = true;
      this.wizardState.currentStep.enter(MovingDirection.Forwards);
    };
    return StrictNavigationMode2;
  }(NavigationMode)
);

// node_modules/ng2-archwizard/dist/navigation/navigation-mode.provider.js
function navigationModeFactory(navigationMode, wizardState) {
  switch (navigationMode) {
    case "free":
      return new FreeNavigationMode(wizardState);
    case "semi-strict":
      return new SemiStrictNavigationMode(wizardState);
    case "strict":
    default:
      return new StrictNavigationMode(wizardState);
  }
}

// node_modules/ng2-archwizard/dist/navigation/wizard-state.model.js
var WizardState = (
  /** @class */
  function() {
    function WizardState2() {
      this._defaultStepIndex = 0;
      this.currentStepIndex = -1;
    }
    Object.defineProperty(WizardState2.prototype, "wizardSteps", {
      /**
       * An array representation of all wizard steps belonging to this model
       */
      get: function() {
        if (this._wizardSteps) {
          return this._wizardSteps.toArray();
        } else {
          return [];
        }
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(WizardState2.prototype, "defaultStepIndex", {
      /**
       * The initial step index.
       * This value can be either:
       * - the index of a wizard step with a `selected` directive, or
       * - the default step index, set in the [[WizardComponent]]
       */
      get: function() {
        var foundDefaultStep = this.wizardSteps.find(function(step) {
          return step.defaultSelected;
        });
        if (foundDefaultStep) {
          return this.getIndexOfStep(foundDefaultStep);
        } else {
          return this._defaultStepIndex;
        }
      },
      /**
       * Sets the initial default step.
       * Beware: This initial default is only used if no wizard step has been enhanced with the `selected` directive
       *
       * @param defaultStepIndex The new default wizard step index
       */
      set: function(defaultStepIndex) {
        this._defaultStepIndex = defaultStepIndex;
      },
      enumerable: true,
      configurable: true
    });
    ;
    Object.defineProperty(WizardState2.prototype, "currentStep", {
      /**
       * The WizardStep object belonging to the currently visible and selected step.
       * The currentStep is always the currently selected wizard step.
       * The currentStep can be either completed, if it was visited earlier,
       * or not completed, if it is visited for the first time or its state is currently out of date.
       *
       * If this wizard contains no steps, currentStep is null
       */
      get: function() {
        if (this.hasStep(this.currentStepIndex)) {
          return this.wizardSteps[this.currentStepIndex];
        } else {
          return null;
        }
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(WizardState2.prototype, "completed", {
      /**
       * The completeness of the wizard.
       * If the wizard has been completed, i.e. all steps are either completed or optional, this value is true, otherwise it is false
       */
      get: function() {
        return this.wizardSteps.every(function(step) {
          return step.completed || step.optional;
        });
      },
      enumerable: true,
      configurable: true
    });
    WizardState2.prototype.initialize = function(wizardSteps, navigationMode, defaultStepIndex, disableNavigationBar) {
      this._wizardSteps = wizardSteps;
      this._defaultStepIndex = defaultStepIndex;
      this.disableNavigationBar = disableNavigationBar;
      this.navigationMode = navigationModeFactory(navigationMode, this);
      this.navigationMode.reset();
    };
    WizardState2.prototype.hasStep = function(stepIndex) {
      return this.wizardSteps.length > 0 && 0 <= stepIndex && stepIndex < this.wizardSteps.length;
    };
    WizardState2.prototype.hasPreviousStep = function() {
      return this.hasStep(this.currentStepIndex - 1);
    };
    WizardState2.prototype.hasNextStep = function() {
      return this.hasStep(this.currentStepIndex + 1);
    };
    WizardState2.prototype.isLastStep = function() {
      return this.wizardSteps.length > 0 && this.currentStepIndex === this.wizardSteps.length - 1;
    };
    WizardState2.prototype.getStepAtIndex = function(stepIndex) {
      if (!this.hasStep(stepIndex)) {
        throw new Error("Expected a known step, but got stepIndex: " + stepIndex + ".");
      }
      return this.wizardSteps[stepIndex];
    };
    WizardState2.prototype.getIndexOfStep = function(step) {
      return this.wizardSteps.indexOf(step);
    };
    WizardState2.prototype.getMovingDirection = function(destinationStep) {
      var movingDirection;
      if (destinationStep > this.currentStepIndex) {
        movingDirection = MovingDirection.Forwards;
      } else if (destinationStep < this.currentStepIndex) {
        movingDirection = MovingDirection.Backwards;
      } else {
        movingDirection = MovingDirection.Stay;
      }
      return movingDirection;
    };
    WizardState2.decorators = [
      { type: Injectable }
    ];
    WizardState2.ctorParameters = function() {
      return [];
    };
    return WizardState2;
  }()
);

// node_modules/ng2-archwizard/dist/components/wizard.component.js
var WizardComponent = (
  /** @class */
  function() {
    function WizardComponent2(model) {
      this.model = model;
      this.navBarLocation = "top";
      this.navBarLayout = "small";
      this.navBarDirection = "left-to-right";
      this.navigationMode = "strict";
      this.defaultStepIndex = 0;
      this.disableNavigationBar = false;
    }
    Object.defineProperty(WizardComponent2.prototype, "horizontalOrientation", {
      /**
       * Returns true if this wizard uses a horizontal orientation.
       * The wizard uses a horizontal orientation, iff the navigation bar is shown at the top or bottom of this wizard
       *
       * @returns {boolean} True if this wizard uses a horizontal orientation
       */
      get: function() {
        return this.navBarLocation === "top" || this.navBarLocation === "bottom";
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(WizardComponent2.prototype, "verticalOrientation", {
      /**
       * Returns true if this wizard uses a vertical orientation.
       * The wizard uses a vertical orientation, iff the navigation bar is shown at the left or right of this wizard
       *
       * @returns {boolean} True if this wizard uses a vertical orientation
       */
      get: function() {
        return this.navBarLocation === "left" || this.navBarLocation === "right";
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(WizardComponent2.prototype, "navigation", {
      /**
       * The navigation mode for this wizard
       *
       * @returns {NavigationMode}
       */
      get: function() {
        return this.model.navigationMode;
      },
      enumerable: true,
      configurable: true
    });
    WizardComponent2.prototype.ngAfterContentInit = function() {
      this.model.initialize(this.wizardSteps, this.navigationMode, this.defaultStepIndex, this.disableNavigationBar);
    };
    WizardComponent2.decorators = [
      { type: Component, args: [{
        selector: "wizard",
        template: `
    <wizard-navigation-bar
      [direction]="navBarDirection"
      *ngIf="navBarLocation == 'top' || navBarLocation == 'left'"
      [ngClass]="{
        vertical: navBarLocation == 'left',
        horizontal: navBarLocation == 'top',
        small: navBarLayout == 'small',
        'large-filled': navBarLayout == 'large-filled',
        'large-filled-symbols': navBarLayout == 'large-filled-symbols',
        'large-empty': navBarLayout == 'large-empty',
        'large-empty-symbols': navBarLayout == 'large-empty-symbols'
      }">
    </wizard-navigation-bar>

    <div [ngClass]="{
      'wizard-steps': true,
      vertical: navBarLocation == 'left' || navBarLocation == 'right',
      horizontal: navBarLocation == 'top' || navBarLocation == 'bottom'
    }">
      <ng-content></ng-content>
    </div>

    <wizard-navigation-bar
      [direction]="navBarDirection"
      *ngIf="navBarLocation == 'bottom' || navBarLocation == 'right'"
      [ngClass]="{
        vertical: navBarLocation == 'right',
        horizontal: navBarLocation == 'bottom',
        small: navBarLayout == 'small',
        'large-filled': navBarLayout == 'large-filled',
        'large-filled-symbols': navBarLayout == 'large-filled-symbols',
        'large-empty': navBarLayout == 'large-empty',
        'large-empty-symbols': navBarLayout == 'large-empty-symbols'
      }">
    </wizard-navigation-bar>
  `,
        styles: ["\n    :host {\n      display: flex;\n      justify-content: flex-start;\n    }\n    :host.vertical {\n      flex-direction: row;\n    }\n    :host.horizontal {\n      flex-direction: column;\n    }\n    :host .wizard-steps {\n      top: 0;\n      display: flex;\n    }\n    :host .wizard-steps.vertical {\n      min-width: calc(100% - 280px);\n      width: 80%;\n      height: 100%;\n      flex-direction: column;\n    }\n    :host .wizard-steps.horizontal {\n      width: 100%;\n      flex-direction: row;\n    }\n  "],
        providers: [WizardState]
      }] }
    ];
    WizardComponent2.ctorParameters = function() {
      return [
        { type: WizardState }
      ];
    };
    WizardComponent2.propDecorators = {
      "wizardSteps": [{ type: ContentChildren, args: [WizardStep] }],
      "navBarLocation": [{ type: Input }],
      "navBarLayout": [{ type: Input }],
      "navBarDirection": [{ type: Input }],
      "navigationMode": [{ type: Input }],
      "defaultStepIndex": [{ type: Input }],
      "disableNavigationBar": [{ type: Input }],
      "horizontalOrientation": [{ type: HostBinding, args: ["class.horizontal"] }],
      "verticalOrientation": [{ type: HostBinding, args: ["class.vertical"] }]
    };
    return WizardComponent2;
  }()
);

// node_modules/ng2-archwizard/dist/components/wizard-completion-step.component.js
var __extends5 = function() {
  var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
    d.__proto__ = b;
  } || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var WizardCompletionStepComponent = (
  /** @class */
  function(_super) {
    __extends5(WizardCompletionStepComponent2, _super);
    function WizardCompletionStepComponent2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    WizardCompletionStepComponent2.decorators = [
      { type: Component, args: [{
        selector: "wizard-completion-step",
        template: "\n    <ng-content></ng-content>\n  ",
        styles: ["\n    :host {\n      height: auto;\n      width: 100%;\n    }\n  "],
        providers: [
          { provide: WizardStep, useExisting: forwardRef(function() {
            return WizardCompletionStepComponent2;
          }) },
          { provide: WizardCompletionStep, useExisting: forwardRef(function() {
            return WizardCompletionStepComponent2;
          }) }
        ]
      }] }
    ];
    WizardCompletionStepComponent2.ctorParameters = function() {
      return [];
    };
    return WizardCompletionStepComponent2;
  }(WizardCompletionStep)
);

// node_modules/ng2-archwizard/dist/components/wizard-navigation-bar.component.js
var WizardNavigationBarComponent = (
  /** @class */
  function() {
    function WizardNavigationBarComponent2(wizardState) {
      this.wizardState = wizardState;
      this.direction = "left-to-right";
    }
    Object.defineProperty(WizardNavigationBarComponent2.prototype, "navigationMode", {
      /**
       * The navigation mode
       *
       * @returns {NavigationMode}
       */
      get: function() {
        return this.wizardState.navigationMode;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(WizardNavigationBarComponent2.prototype, "wizardSteps", {
      /**
       * Returns all [[WizardStep]]s contained in the wizard
       *
       * @returns {Array<WizardStep>} An array containing all [[WizardStep]]s
       */
      get: function() {
        switch (this.direction) {
          case "right-to-left":
            return this.wizardState.wizardSteps.reverse();
          case "left-to-right":
          default:
            return this.wizardState.wizardSteps;
        }
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(WizardNavigationBarComponent2.prototype, "numberOfWizardSteps", {
      /**
       * Returns the number of wizard steps, that need to be displaced in the navigation bar
       *
       * @returns {number} The number of wizard steps to be displayed
       */
      get: function() {
        return this.wizardState.wizardSteps.length;
      },
      enumerable: true,
      configurable: true
    });
    WizardNavigationBarComponent2.prototype.isCurrent = function(wizardStep) {
      return wizardStep.selected && !wizardStep.completed && !this.wizardState.completed;
    };
    WizardNavigationBarComponent2.prototype.isDone = function(wizardStep) {
      return wizardStep.completed && !wizardStep.selected || this.wizardState.completed;
    };
    WizardNavigationBarComponent2.prototype.isDefault = function(wizardStep) {
      return !wizardStep.optional && !wizardStep.completed && !wizardStep.selected && !this.wizardState.completed;
    };
    WizardNavigationBarComponent2.prototype.isEditing = function(wizardStep) {
      return wizardStep.selected && wizardStep.completed && !this.wizardState.completed;
    };
    WizardNavigationBarComponent2.prototype.isOptional = function(wizardStep) {
      return wizardStep.optional && !wizardStep.completed && !wizardStep.selected && !this.wizardState.completed;
    };
    WizardNavigationBarComponent2.prototype.isNavigable = function(wizardStep) {
      return !wizardStep.selected && !this.wizardState.disableNavigationBar && this.navigationMode.isNavigable(this.wizardState.getIndexOfStep(wizardStep));
    };
    WizardNavigationBarComponent2.decorators = [
      { type: Component, args: [{
        selector: "wizard-navigation-bar",
        template: `
    <ul class="steps-indicator steps-{{numberOfWizardSteps}}">
      <li *ngFor="let step of wizardSteps"
          [attr.step-symbol]="step.navigationSymbol"
          [ngStyle]="{
            'font-family': step.navigationSymbolFontFamily
          }"
          [ngClass]="{
            default: isDefault(step),
            current: isCurrent(step),
            done: isDone(step),
            editing: isEditing(step),
            optional: isOptional(step),
            navigable: isNavigable(step)
      }">
        <div>
          <a [goToStep]="step">
            <ng-container *ngIf="step.stepTitleTemplate" [ngTemplateOutlet]="step.stepTitleTemplate.templateRef"></ng-container>
            <ng-container *ngIf="!step.stepTitleTemplate">{{step.stepTitle}}</ng-container>
          </a>
        </div>
      </li>
    </ul>
  `,
        styles: ["\n    /*\n     color definitions\n     */\n    /*\n     dot definitions\n     */\n    /*\n     extra distance between the bottom of the dots and the baseline texts\n     */\n    :host.horizontal.small ul.steps-indicator {\n      padding: 24px 0 10px 0;\n    }\n    :host.horizontal.small ul.steps-indicator li:not(:last-child):before {\n      background-color: #E6E6E6;\n      content: '';\n      position: absolute;\n      height: 1px;\n      width: calc(100% - 14px);\n      top: -7px;\n      left: calc(50% + 7px);\n    }\n    :host.horizontal.small ul.steps-indicator li:after {\n      position: absolute;\n      top: -14px;\n      left: calc(50% - 7px);\n      width: 14px;\n      height: 14px;\n      content: '';\n      text-align: center;\n      vertical-align: middle;\n      line-height: 14px;\n      transition: 0.25s;\n      border-radius: 100%;\n      background-color: #E6E6E6;\n    }\n    :host.horizontal.small ul.steps-indicator li.default a:hover {\n      color: #808080;\n    }\n    :host.horizontal.small ul.steps-indicator li.current:after {\n      background-color: #808080;\n    }\n    :host.horizontal.small ul.steps-indicator li.done:after {\n      background-color: #339933;\n    }\n    :host.horizontal.small ul.steps-indicator li.optional:after {\n      background-color: #38ef38;\n    }\n    :host.horizontal.small ul.steps-indicator li.editing:after {\n      background-color: #FF0000;\n    }\n    :host.horizontal.large-filled ul.steps-indicator {\n      padding: 60px 0 10px 0;\n    }\n    :host.horizontal.large-filled ul.steps-indicator li:not(:last-child):before {\n      background-color: #E6E6E6;\n      content: '';\n      position: absolute;\n      height: 1px;\n      width: calc(100% - 50px);\n      top: -25px;\n      left: calc(50% + 25px);\n    }\n    :host.horizontal.large-filled ul.steps-indicator li:after {\n      position: absolute;\n      top: -50px;\n      left: calc(50% - 25px);\n      width: 50px;\n      height: 50px;\n      content: '';\n      text-align: center;\n      vertical-align: middle;\n      line-height: 50px;\n      transition: 0.25s;\n      border-radius: 100%;\n      background-color: #E6E6E6;\n    }\n    :host.horizontal.large-filled ul.steps-indicator li.default a:hover {\n      color: #808080;\n    }\n    :host.horizontal.large-filled ul.steps-indicator li.current:after {\n      background-color: #808080;\n    }\n    :host.horizontal.large-filled ul.steps-indicator li.done:after {\n      background-color: #339933;\n    }\n    :host.horizontal.large-filled ul.steps-indicator li.optional:after {\n      background-color: #38ef38;\n    }\n    :host.horizontal.large-filled ul.steps-indicator li.editing:after {\n      background-color: #FF0000;\n    }\n    :host.horizontal.large-empty ul.steps-indicator {\n      padding: 60px 0 10px 0;\n    }\n    :host.horizontal.large-empty ul.steps-indicator li:not(:last-child):before {\n      background-color: #E6E6E6;\n      content: '';\n      position: absolute;\n      height: 1px;\n      width: calc(100% - 50px);\n      top: -25px;\n      left: calc(50% + 25px);\n    }\n    :host.horizontal.large-empty ul.steps-indicator li:after {\n      position: absolute;\n      top: -50px;\n      left: calc(50% - 25px);\n      width: 50px;\n      height: 50px;\n      content: '';\n      text-align: center;\n      vertical-align: middle;\n      line-height: 46px;\n      transition: 0.25s;\n      border-radius: 100%;\n      border-width: 2px;\n      border-style: solid;\n      border-color: #E6E6E6;\n    }\n    :host.horizontal.large-empty ul.steps-indicator li.default a:hover {\n      color: #808080;\n    }\n    :host.horizontal.large-empty ul.steps-indicator li.current:after {\n      border-width: 2px;\n      border-style: solid;\n      border-color: #808080;\n    }\n    :host.horizontal.large-empty ul.steps-indicator li.done:after {\n      border-width: 2px;\n      border-style: solid;\n      border-color: #339933;\n    }\n    :host.horizontal.large-empty ul.steps-indicator li.optional:after {\n      border-width: 2px;\n      border-style: solid;\n      border-color: #38ef38;\n    }\n    :host.horizontal.large-empty ul.steps-indicator li.editing:after {\n      border-width: 2px;\n      border-style: solid;\n      border-color: #FF0000;\n    }\n    :host.horizontal.large-filled-symbols ul.steps-indicator {\n      padding: 60px 0 10px 0;\n    }\n    :host.horizontal.large-filled-symbols ul.steps-indicator li:not(:last-child):before {\n      background-color: #E6E6E6;\n      content: '';\n      position: absolute;\n      height: 1px;\n      width: calc(100% - 50px);\n      top: -25px;\n      left: calc(50% + 25px);\n    }\n    :host.horizontal.large-filled-symbols ul.steps-indicator li:after {\n      position: absolute;\n      top: -50px;\n      left: calc(50% - 25px);\n      width: 50px;\n      height: 50px;\n      content: '';\n      text-align: center;\n      vertical-align: middle;\n      line-height: 50px;\n      transition: 0.25s;\n      border-radius: 100%;\n      background-color: #E6E6E6;\n      color: black;\n      content: attr(step-symbol);\n    }\n    :host.horizontal.large-filled-symbols ul.steps-indicator li.default a:hover {\n      color: #808080;\n    }\n    :host.horizontal.large-filled-symbols ul.steps-indicator li.current:after {\n      background-color: #808080;\n      color: black;\n    }\n    :host.horizontal.large-filled-symbols ul.steps-indicator li.done:after {\n      background-color: #339933;\n      color: black;\n    }\n    :host.horizontal.large-filled-symbols ul.steps-indicator li.optional:after {\n      background-color: #38ef38;\n      color: black;\n    }\n    :host.horizontal.large-filled-symbols ul.steps-indicator li.editing:after {\n      background-color: #FF0000;\n      color: black;\n    }\n    :host.horizontal.large-empty-symbols ul.steps-indicator {\n      padding: 60px 0 10px 0;\n    }\n    :host.horizontal.large-empty-symbols ul.steps-indicator li:not(:last-child):before {\n      background-color: #E6E6E6;\n      content: '';\n      position: absolute;\n      height: 1px;\n      width: calc(100% - 50px);\n      top: -25px;\n      left: calc(50% + 25px);\n    }\n    :host.horizontal.large-empty-symbols ul.steps-indicator li:after {\n      position: absolute;\n      top: -50px;\n      left: calc(50% - 25px);\n      width: 50px;\n      height: 50px;\n      content: '';\n      text-align: center;\n      vertical-align: middle;\n      line-height: 46px;\n      transition: 0.25s;\n      border-radius: 100%;\n      border-width: 2px;\n      border-style: solid;\n      border-color: #E6E6E6;\n      color: #E6E6E6;\n      content: attr(step-symbol);\n    }\n    :host.horizontal.large-empty-symbols ul.steps-indicator li.default a:hover {\n      color: #808080;\n    }\n    :host.horizontal.large-empty-symbols ul.steps-indicator li.current:after {\n      border-width: 2px;\n      border-style: solid;\n      border-color: #808080;\n      color: #808080;\n    }\n    :host.horizontal.large-empty-symbols ul.steps-indicator li.done:after {\n      border-width: 2px;\n      border-style: solid;\n      border-color: #339933;\n      color: #339933;\n    }\n    :host.horizontal.large-empty-symbols ul.steps-indicator li.optional:after {\n      border-width: 2px;\n      border-style: solid;\n      border-color: #38ef38;\n      color: #38ef38;\n    }\n    :host.horizontal.large-empty-symbols ul.steps-indicator li.editing:after {\n      border-width: 2px;\n      border-style: solid;\n      border-color: #FF0000;\n      color: #FF0000;\n    }\n    :host.horizontal ul.steps-indicator {\n      display: flex;\n      flex-direction: row;\n      justify-content: center;\n      right: 0;\n      bottom: 0;\n      left: 0;\n      margin: 0;\n      width: 100%;\n      list-style: none;\n      /* --- http://www.paulirish.com/2012/box-sizing-border-box-ftw/ ---- */\n    }\n    :host.horizontal ul.steps-indicator.steps-2:before {\n      left: 25%;\n      right: 25%;\n    }\n    :host.horizontal ul.steps-indicator.steps-2 li {\n      width: 50%;\n    }\n    :host.horizontal ul.steps-indicator.steps-3:before {\n      left: 16.66666667%;\n      right: 16.66666667%;\n    }\n    :host.horizontal ul.steps-indicator.steps-3 li {\n      width: 33.33333333%;\n    }\n    :host.horizontal ul.steps-indicator.steps-4:before {\n      left: 12.5%;\n      right: 12.5%;\n    }\n    :host.horizontal ul.steps-indicator.steps-4 li {\n      width: 25%;\n    }\n    :host.horizontal ul.steps-indicator.steps-5:before {\n      left: 10%;\n      right: 10%;\n    }\n    :host.horizontal ul.steps-indicator.steps-5 li {\n      width: 20%;\n    }\n    :host.horizontal ul.steps-indicator.steps-6:before {\n      left: 8.33333333%;\n      right: 8.33333333%;\n    }\n    :host.horizontal ul.steps-indicator.steps-6 li {\n      width: 16.66666667%;\n    }\n    :host.horizontal ul.steps-indicator.steps-7:before {\n      left: 7.14285714%;\n      right: 7.14285714%;\n    }\n    :host.horizontal ul.steps-indicator.steps-7 li {\n      width: 14.28571429%;\n    }\n    :host.horizontal ul.steps-indicator.steps-8:before {\n      left: 6.25%;\n      right: 6.25%;\n    }\n    :host.horizontal ul.steps-indicator.steps-8 li {\n      width: 12.5%;\n    }\n    :host.horizontal ul.steps-indicator.steps-9:before {\n      left: 5.55555556%;\n      right: 5.55555556%;\n    }\n    :host.horizontal ul.steps-indicator.steps-9 li {\n      width: 11.11111111%;\n    }\n    :host.horizontal ul.steps-indicator.steps-10:before {\n      left: 5%;\n      right: 5%;\n    }\n    :host.horizontal ul.steps-indicator.steps-10 li {\n      width: 10%;\n    }\n    :host.horizontal ul.steps-indicator * {\n      -webkit-box-sizing: border-box;\n      -moz-box-sizing: border-box;\n      box-sizing: border-box;\n    }\n    :host.horizontal ul.steps-indicator li {\n      position: relative;\n      margin: 0;\n      padding: 10px 0 0 0;\n      pointer-events: none;\n    }\n    :host.horizontal ul.steps-indicator li div {\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n    }\n    :host.horizontal ul.steps-indicator li div a {\n      color: #808080;\n      line-height: 14px;\n      font-size: 14px;\n      text-decoration: none;\n      text-transform: uppercase;\n      text-align: center;\n      font-weight: bold;\n      transition: 0.25s;\n      cursor: pointer;\n    }\n    :host.horizontal ul.steps-indicator li div a:hover {\n      color: #4d4d4d;\n    }\n    :host.horizontal ul.steps-indicator li.navigable {\n      pointer-events: auto;\n    }\n    /*\n     color definitions\n     */\n    /*\n     dot definitions\n     */\n    /*\n     extra distance between the bottom of the dots and the baseline texts\n     */\n    :host.vertical {\n      max-width: 280px;\n      width: 20%;\n      height: 100%;\n      position: sticky;\n      top: 0;\n    }\n    :host.vertical.small ul.steps-indicator {\n      padding: 5px 5px 5px 19px;\n    }\n    :host.vertical.small ul.steps-indicator li:not(:last-child):before {\n      background-color: #E6E6E6;\n      content: '';\n      position: absolute;\n      left: -7px;\n      top: 14px;\n      height: calc(100% - 14px);\n      width: 1px;\n    }\n    :host.vertical.small ul.steps-indicator li:after {\n      position: absolute;\n      top: 0;\n      left: -14px;\n      width: 14px;\n      height: 14px;\n      content: '';\n      text-align: center;\n      vertical-align: middle;\n      line-height: 14px;\n      transition: 0.25s;\n      border-radius: 100%;\n      background-color: #E6E6E6;\n    }\n    :host.vertical.small ul.steps-indicator li div {\n      min-height: 14px;\n    }\n    :host.vertical.small ul.steps-indicator li.default a:hover {\n      color: #808080;\n    }\n    :host.vertical.small ul.steps-indicator li.current:after {\n      background-color: #808080;\n    }\n    :host.vertical.small ul.steps-indicator li.done:after {\n      background-color: #339933;\n    }\n    :host.vertical.small ul.steps-indicator li.optional:after {\n      background-color: #38ef38;\n    }\n    :host.vertical.small ul.steps-indicator li.editing:after {\n      background-color: #FF0000;\n    }\n    :host.vertical.large-filled ul.steps-indicator {\n      padding: 5px 5px 5px 55px;\n    }\n    :host.vertical.large-filled ul.steps-indicator li:not(:last-child):before {\n      background-color: #E6E6E6;\n      content: '';\n      position: absolute;\n      left: -25px;\n      top: 50px;\n      height: calc(100% - 50px);\n      width: 1px;\n    }\n    :host.vertical.large-filled ul.steps-indicator li:after {\n      position: absolute;\n      top: 0;\n      left: -50px;\n      width: 50px;\n      height: 50px;\n      content: '';\n      text-align: center;\n      vertical-align: middle;\n      line-height: 50px;\n      transition: 0.25s;\n      border-radius: 100%;\n      background-color: #E6E6E6;\n    }\n    :host.vertical.large-filled ul.steps-indicator li div {\n      min-height: 50px;\n    }\n    :host.vertical.large-filled ul.steps-indicator li.default a:hover {\n      color: #808080;\n    }\n    :host.vertical.large-filled ul.steps-indicator li.current:after {\n      background-color: #808080;\n    }\n    :host.vertical.large-filled ul.steps-indicator li.done:after {\n      background-color: #339933;\n    }\n    :host.vertical.large-filled ul.steps-indicator li.optional:after {\n      background-color: #38ef38;\n    }\n    :host.vertical.large-filled ul.steps-indicator li.editing:after {\n      background-color: #FF0000;\n    }\n    :host.vertical.large-empty ul.steps-indicator {\n      padding: 5px 5px 5px 55px;\n    }\n    :host.vertical.large-empty ul.steps-indicator li:not(:last-child):before {\n      background-color: #E6E6E6;\n      content: '';\n      position: absolute;\n      left: -25px;\n      top: 50px;\n      height: calc(100% - 50px);\n      width: 1px;\n    }\n    :host.vertical.large-empty ul.steps-indicator li:after {\n      position: absolute;\n      top: 0;\n      left: -50px;\n      width: 50px;\n      height: 50px;\n      content: '';\n      text-align: center;\n      vertical-align: middle;\n      line-height: 46px;\n      transition: 0.25s;\n      border-radius: 100%;\n      border-width: 2px;\n      border-style: solid;\n      border-color: #E6E6E6;\n    }\n    :host.vertical.large-empty ul.steps-indicator li div {\n      min-height: 54px;\n    }\n    :host.vertical.large-empty ul.steps-indicator li.default a:hover {\n      color: #808080;\n    }\n    :host.vertical.large-empty ul.steps-indicator li.current:after {\n      border-width: 2px;\n      border-style: solid;\n      border-color: #808080;\n    }\n    :host.vertical.large-empty ul.steps-indicator li.done:after {\n      border-width: 2px;\n      border-style: solid;\n      border-color: #339933;\n    }\n    :host.vertical.large-empty ul.steps-indicator li.optional:after {\n      border-width: 2px;\n      border-style: solid;\n      border-color: #38ef38;\n    }\n    :host.vertical.large-empty ul.steps-indicator li.editing:after {\n      border-width: 2px;\n      border-style: solid;\n      border-color: #FF0000;\n    }\n    :host.vertical.large-filled-symbols ul.steps-indicator {\n      padding: 5px 5px 5px 55px;\n    }\n    :host.vertical.large-filled-symbols ul.steps-indicator li:not(:last-child):before {\n      background-color: #E6E6E6;\n      content: '';\n      position: absolute;\n      left: -25px;\n      top: 50px;\n      height: calc(100% - 50px);\n      width: 1px;\n    }\n    :host.vertical.large-filled-symbols ul.steps-indicator li:after {\n      position: absolute;\n      top: 0;\n      left: -50px;\n      width: 50px;\n      height: 50px;\n      content: '';\n      text-align: center;\n      vertical-align: middle;\n      line-height: 50px;\n      transition: 0.25s;\n      border-radius: 100%;\n      background-color: #E6E6E6;\n      color: black;\n      content: attr(step-symbol);\n    }\n    :host.vertical.large-filled-symbols ul.steps-indicator li div {\n      min-height: 50px;\n    }\n    :host.vertical.large-filled-symbols ul.steps-indicator li.default a:hover {\n      color: #808080;\n    }\n    :host.vertical.large-filled-symbols ul.steps-indicator li.current:after {\n      background-color: #808080;\n      color: black;\n    }\n    :host.vertical.large-filled-symbols ul.steps-indicator li.done:after {\n      background-color: #339933;\n      color: black;\n    }\n    :host.vertical.large-filled-symbols ul.steps-indicator li.optional:after {\n      background-color: #38ef38;\n      color: black;\n    }\n    :host.vertical.large-filled-symbols ul.steps-indicator li.editing:after {\n      background-color: #FF0000;\n      color: black;\n    }\n    :host.vertical.large-empty-symbols ul.steps-indicator {\n      padding: 5px 5px 5px 55px;\n    }\n    :host.vertical.large-empty-symbols ul.steps-indicator li:not(:last-child):before {\n      background-color: #E6E6E6;\n      content: '';\n      position: absolute;\n      left: -25px;\n      top: 50px;\n      height: calc(100% - 50px);\n      width: 1px;\n    }\n    :host.vertical.large-empty-symbols ul.steps-indicator li:after {\n      position: absolute;\n      top: 0;\n      left: -50px;\n      width: 50px;\n      height: 50px;\n      content: '';\n      text-align: center;\n      vertical-align: middle;\n      line-height: 46px;\n      transition: 0.25s;\n      border-radius: 100%;\n      border-width: 2px;\n      border-style: solid;\n      border-color: #E6E6E6;\n      color: #E6E6E6;\n      content: attr(step-symbol);\n    }\n    :host.vertical.large-empty-symbols ul.steps-indicator li div {\n      min-height: 54px;\n    }\n    :host.vertical.large-empty-symbols ul.steps-indicator li.default a:hover {\n      color: #808080;\n    }\n    :host.vertical.large-empty-symbols ul.steps-indicator li.current:after {\n      border-width: 2px;\n      border-style: solid;\n      border-color: #808080;\n      color: #808080;\n    }\n    :host.vertical.large-empty-symbols ul.steps-indicator li.done:after {\n      border-width: 2px;\n      border-style: solid;\n      border-color: #339933;\n      color: #339933;\n    }\n    :host.vertical.large-empty-symbols ul.steps-indicator li.optional:after {\n      border-width: 2px;\n      border-style: solid;\n      border-color: #38ef38;\n      color: #38ef38;\n    }\n    :host.vertical.large-empty-symbols ul.steps-indicator li.editing:after {\n      border-width: 2px;\n      border-style: solid;\n      border-color: #FF0000;\n      color: #FF0000;\n    }\n    :host.vertical ul.steps-indicator {\n      display: flex;\n      flex-direction: column;\n      justify-content: center;\n      list-style: none;\n      margin: auto;\n      /* --- http://www.paulirish.com/2012/box-sizing-border-box-ftw/ ---- */\n    }\n    :host.vertical ul.steps-indicator * {\n      -webkit-box-sizing: border-box;\n      -moz-box-sizing: border-box;\n      box-sizing: border-box;\n    }\n    :host.vertical ul.steps-indicator li {\n      position: relative;\n      pointer-events: none;\n    }\n    :host.vertical ul.steps-indicator li:not(:last-child) {\n      margin-bottom: 0;\n      padding-bottom: 10px;\n    }\n    :host.vertical ul.steps-indicator li div {\n      display: flex;\n      flex-direction: row;\n      align-items: center;\n    }\n    :host.vertical ul.steps-indicator li div a {\n      color: #808080;\n      margin-left: 15px;\n      line-height: 14px;\n      font-size: 14px;\n      text-decoration: none;\n      text-transform: uppercase;\n      text-align: left;\n      font-weight: bold;\n      transition: 0.25s;\n      cursor: pointer;\n    }\n    :host.vertical ul.steps-indicator li div a:hover {\n      color: #4d4d4d;\n    }\n    :host.vertical ul.steps-indicator li.navigable {\n      pointer-events: auto;\n    }\n  "]
      }] }
    ];
    WizardNavigationBarComponent2.ctorParameters = function() {
      return [
        { type: WizardState }
      ];
    };
    WizardNavigationBarComponent2.propDecorators = {
      "direction": [{ type: Input }]
    };
    return WizardNavigationBarComponent2;
  }()
);

// node_modules/ng2-archwizard/dist/components/wizard-step.component.js
var __extends6 = function() {
  var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
    d.__proto__ = b;
  } || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var WizardStepComponent = (
  /** @class */
  function(_super) {
    __extends6(WizardStepComponent2, _super);
    function WizardStepComponent2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    WizardStepComponent2.decorators = [
      { type: Component, args: [{
        selector: "wizard-step",
        template: "\n    <ng-content></ng-content>\n  ",
        styles: ["\n    :host {\n      height: auto;\n      width: 100%;\n    }\n  "],
        providers: [
          { provide: WizardStep, useExisting: forwardRef(function() {
            return WizardStepComponent2;
          }) }
        ]
      }] }
    ];
    WizardStepComponent2.ctorParameters = function() {
      return [];
    };
    return WizardStepComponent2;
  }(WizardStep)
);

// node_modules/ng2-archwizard/dist/directives/enable-back-links.directive.js
var EnableBackLinksDirective = (
  /** @class */
  function() {
    function EnableBackLinksDirective2(completionStep) {
      this.completionStep = completionStep;
      this.stepExit = new EventEmitter();
    }
    EnableBackLinksDirective2.prototype.ngOnInit = function() {
      this.completionStep.canExit = true;
      this.completionStep.stepExit = this.stepExit;
    };
    EnableBackLinksDirective2.decorators = [
      { type: Directive, args: [{
        selector: "[enableBackLinks]"
      }] }
    ];
    EnableBackLinksDirective2.ctorParameters = function() {
      return [
        { type: WizardCompletionStep, decorators: [{ type: Host }] }
      ];
    };
    EnableBackLinksDirective2.propDecorators = {
      "stepExit": [{ type: Output }]
    };
    return EnableBackLinksDirective2;
  }()
);

// node_modules/ng2-archwizard/dist/util/step-offset.interface.js
function isStepOffset(value) {
  return value.hasOwnProperty("stepOffset");
}

// node_modules/ng2-archwizard/dist/directives/go-to-step.directive.js
var import_util2 = __toESM(require_util());
var GoToStepDirective = (
  /** @class */
  function() {
    function GoToStepDirective2(wizardState, wizardStep) {
      this.wizardState = wizardState;
      this.wizardStep = wizardStep;
      this.preFinalize = new EventEmitter();
      this.postFinalize = new EventEmitter();
    }
    Object.defineProperty(GoToStepDirective2.prototype, "finalize", {
      /**
       * A convenience field for `preFinalize`
       */
      get: function() {
        return this.preFinalize;
      },
      /**
       * A convenience name for `preFinalize`
       *
       * @param {EventEmitter<void>} emitter The [[EventEmitter]] to be set
       */
      set: function(emitter) {
        this.preFinalize = emitter;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(GoToStepDirective2.prototype, "navigationMode", {
      /**
       * The navigation mode
       *
       * @returns {NavigationMode}
       */
      get: function() {
        return this.wizardState.navigationMode;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(GoToStepDirective2.prototype, "destinationStep", {
      /**
       * Returns the destination step of this directive as an absolute step index inside the wizard
       *
       * @returns {number} The index of the destination step
       * @throws If `goToStep` is of an unknown type an `Error` is thrown
       */
      get: function() {
        var destinationStep;
        if ((0, import_util2.isNumber)(this.goToStep)) {
          destinationStep = this.goToStep;
        } else if ((0, import_util2.isString)(this.goToStep)) {
          destinationStep = parseInt(this.goToStep, 10);
        } else if (isStepOffset(this.goToStep) && this.wizardStep !== null) {
          destinationStep = this.wizardState.getIndexOfStep(this.wizardStep) + this.goToStep.stepOffset;
        } else if (this.goToStep instanceof WizardStep) {
          destinationStep = this.wizardState.getIndexOfStep(this.goToStep);
        } else {
          throw new Error("Input 'goToStep' is neither a WizardStep, StepOffset, number or string");
        }
        return destinationStep;
      },
      enumerable: true,
      configurable: true
    });
    GoToStepDirective2.prototype.onClick = function() {
      this.navigationMode.goToStep(this.destinationStep, this.preFinalize, this.postFinalize);
    };
    GoToStepDirective2.decorators = [
      { type: Directive, args: [{
        selector: "[goToStep]"
      }] }
    ];
    GoToStepDirective2.ctorParameters = function() {
      return [
        { type: WizardState },
        { type: WizardStep, decorators: [{ type: Optional }] }
      ];
    };
    GoToStepDirective2.propDecorators = {
      "preFinalize": [{ type: Output }],
      "postFinalize": [{ type: Output }],
      "finalize": [{ type: Output }],
      "goToStep": [{ type: Input }],
      "onClick": [{ type: HostListener, args: ["click", ["$event"]] }]
    };
    return GoToStepDirective2;
  }()
);

// node_modules/ng2-archwizard/dist/directives/next-step.directive.js
var NextStepDirective = (
  /** @class */
  function() {
    function NextStepDirective2(wizardState) {
      this.wizardState = wizardState;
      this.preFinalize = new EventEmitter();
      this.postFinalize = new EventEmitter();
    }
    Object.defineProperty(NextStepDirective2.prototype, "finalize", {
      /**
       * A convenience field for `preFinalize`
       */
      get: function() {
        return this.preFinalize;
      },
      /**
       * A convenience name for `preFinalize`
       *
       * @param {EventEmitter<void>} emitter The [[EventEmitter]] to be set
       */
      set: function(emitter) {
        this.preFinalize = emitter;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(NextStepDirective2.prototype, "navigationMode", {
      /**
       * The navigation mode
       *
       * @returns {NavigationMode}
       */
      get: function() {
        return this.wizardState.navigationMode;
      },
      enumerable: true,
      configurable: true
    });
    NextStepDirective2.prototype.onClick = function() {
      this.navigationMode.goToNextStep(this.preFinalize, this.postFinalize);
    };
    NextStepDirective2.decorators = [
      { type: Directive, args: [{
        selector: "[nextStep]"
      }] }
    ];
    NextStepDirective2.ctorParameters = function() {
      return [
        { type: WizardState }
      ];
    };
    NextStepDirective2.propDecorators = {
      "preFinalize": [{ type: Output }],
      "postFinalize": [{ type: Output }],
      "finalize": [{ type: Output }],
      "onClick": [{ type: HostListener, args: ["click", ["$event"]] }]
    };
    return NextStepDirective2;
  }()
);

// node_modules/ng2-archwizard/dist/directives/optional-step.directive.js
var OptionalStepDirective = (
  /** @class */
  function() {
    function OptionalStepDirective2(wizardStep) {
      this.wizardStep = wizardStep;
    }
    OptionalStepDirective2.prototype.ngOnInit = function() {
      this.wizardStep.optional = true;
    };
    OptionalStepDirective2.decorators = [
      { type: Directive, args: [{
        selector: "[optionalStep]"
      }] }
    ];
    OptionalStepDirective2.ctorParameters = function() {
      return [
        { type: WizardStep, decorators: [{ type: Host }] }
      ];
    };
    return OptionalStepDirective2;
  }()
);

// node_modules/ng2-archwizard/dist/directives/previous-step.directive.js
var PreviousStepDirective = (
  /** @class */
  function() {
    function PreviousStepDirective2(wizardState) {
      this.wizardState = wizardState;
      this.preFinalize = new EventEmitter();
      this.postFinalize = new EventEmitter();
    }
    Object.defineProperty(PreviousStepDirective2.prototype, "finalize", {
      /**
       * A convenience field for `preFinalize`
       */
      get: function() {
        return this.preFinalize;
      },
      /**
       * A convenience field for `preFinalize`
       *
       * @param {EventEmitter<void>} emitter The [[EventEmitter]] to be set
       */
      set: function(emitter) {
        this.preFinalize = emitter;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(PreviousStepDirective2.prototype, "navigationMode", {
      /**
       * The navigation mode
       *
       * @returns {NavigationMode}
       */
      get: function() {
        return this.wizardState.navigationMode;
      },
      enumerable: true,
      configurable: true
    });
    PreviousStepDirective2.prototype.onClick = function() {
      this.navigationMode.goToPreviousStep(this.preFinalize, this.postFinalize);
    };
    PreviousStepDirective2.decorators = [
      { type: Directive, args: [{
        selector: "[previousStep]"
      }] }
    ];
    PreviousStepDirective2.ctorParameters = function() {
      return [
        { type: WizardState }
      ];
    };
    PreviousStepDirective2.propDecorators = {
      "preFinalize": [{ type: Output }],
      "postFinalize": [{ type: Output }],
      "finalize": [{ type: Output }],
      "onClick": [{ type: HostListener, args: ["click", ["$event"]] }]
    };
    return PreviousStepDirective2;
  }()
);

// node_modules/ng2-archwizard/dist/directives/reset-wizard.directive.js
var ResetWizardDirective = (
  /** @class */
  function() {
    function ResetWizardDirective2(wizardState) {
      this.wizardState = wizardState;
      this.finalize = new EventEmitter();
    }
    Object.defineProperty(ResetWizardDirective2.prototype, "navigationMode", {
      /**
       * The navigation mode
       *
       * @returns {NavigationMode}
       */
      get: function() {
        return this.wizardState.navigationMode;
      },
      enumerable: true,
      configurable: true
    });
    ResetWizardDirective2.prototype.onClick = function() {
      this.finalize.emit();
      this.navigationMode.reset();
    };
    ResetWizardDirective2.decorators = [
      { type: Directive, args: [{
        selector: "[resetWizard]"
      }] }
    ];
    ResetWizardDirective2.ctorParameters = function() {
      return [
        { type: WizardState }
      ];
    };
    ResetWizardDirective2.propDecorators = {
      "finalize": [{ type: Output }],
      "onClick": [{ type: HostListener, args: ["click", ["$event"]] }]
    };
    return ResetWizardDirective2;
  }()
);

// node_modules/ng2-archwizard/dist/directives/selected-step.directive.js
var SelectedStepDirective = (
  /** @class */
  function() {
    function SelectedStepDirective2(wizardStep) {
      this.wizardStep = wizardStep;
    }
    SelectedStepDirective2.prototype.ngOnInit = function() {
      this.wizardStep.defaultSelected = true;
    };
    SelectedStepDirective2.decorators = [
      { type: Directive, args: [{
        selector: "[selectedStep]"
      }] }
    ];
    SelectedStepDirective2.ctorParameters = function() {
      return [
        { type: WizardStep, decorators: [{ type: Host }] }
      ];
    };
    return SelectedStepDirective2;
  }()
);

// node_modules/ng2-archwizard/dist/directives/wizard-completion-step.directive.js
var __extends7 = function() {
  var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
    d.__proto__ = b;
  } || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var WizardCompletionStepDirective = (
  /** @class */
  function(_super) {
    __extends7(WizardCompletionStepDirective2, _super);
    function WizardCompletionStepDirective2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    WizardCompletionStepDirective2.decorators = [
      { type: Directive, args: [{
        selector: "[wizardCompletionStep]",
        providers: [
          { provide: WizardStep, useExisting: forwardRef(function() {
            return WizardCompletionStepDirective2;
          }) },
          { provide: WizardCompletionStep, useExisting: forwardRef(function() {
            return WizardCompletionStepDirective2;
          }) }
        ]
      }] }
    ];
    WizardCompletionStepDirective2.ctorParameters = function() {
      return [];
    };
    return WizardCompletionStepDirective2;
  }(WizardCompletionStep)
);

// node_modules/ng2-archwizard/dist/directives/wizard-step.directive.js
var __extends8 = function() {
  var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
    d.__proto__ = b;
  } || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var WizardStepDirective = (
  /** @class */
  function(_super) {
    __extends8(WizardStepDirective2, _super);
    function WizardStepDirective2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    WizardStepDirective2.decorators = [
      { type: Directive, args: [{
        selector: "[wizardStep]",
        providers: [
          { provide: WizardStep, useExisting: forwardRef(function() {
            return WizardStepDirective2;
          }) }
        ]
      }] }
    ];
    WizardStepDirective2.ctorParameters = function() {
      return [];
    };
    return WizardStepDirective2;
  }(WizardStep)
);

// node_modules/ng2-archwizard/dist/archwizard.module.js
var ArchwizardModule = (
  /** @class */
  function() {
    function ArchwizardModule2() {
    }
    ArchwizardModule2.forRoot = function() {
      return { ngModule: ArchwizardModule2, providers: [] };
    };
    ArchwizardModule2.decorators = [
      { type: NgModule, args: [{
        declarations: [
          WizardComponent,
          WizardStepComponent,
          WizardNavigationBarComponent,
          WizardCompletionStepComponent,
          GoToStepDirective,
          NextStepDirective,
          PreviousStepDirective,
          OptionalStepDirective,
          WizardStepTitleDirective,
          EnableBackLinksDirective,
          WizardStepDirective,
          WizardCompletionStepDirective,
          SelectedStepDirective,
          ResetWizardDirective
        ],
        imports: [
          CommonModule
        ],
        exports: [
          WizardComponent,
          WizardStepComponent,
          WizardNavigationBarComponent,
          WizardCompletionStepComponent,
          GoToStepDirective,
          NextStepDirective,
          PreviousStepDirective,
          OptionalStepDirective,
          WizardStepTitleDirective,
          EnableBackLinksDirective,
          WizardStepDirective,
          WizardCompletionStepDirective,
          SelectedStepDirective,
          ResetWizardDirective
        ]
      }] }
    ];
    ArchwizardModule2.ctorParameters = function() {
      return [];
    };
    return ArchwizardModule2;
  }()
);
export {
  ArchwizardModule,
  EnableBackLinksDirective,
  FreeNavigationMode,
  GoToStepDirective,
  MovingDirection,
  NavigationMode,
  NextStepDirective,
  OptionalStepDirective,
  PreviousStepDirective,
  ResetWizardDirective,
  SelectedStepDirective,
  SemiStrictNavigationMode,
  StrictNavigationMode,
  WizardCompletionStep,
  WizardCompletionStepComponent,
  WizardCompletionStepDirective,
  WizardComponent,
  WizardNavigationBarComponent,
  WizardState,
  WizardStep,
  WizardStepComponent,
  WizardStepDirective,
  WizardStepTitleDirective,
  isStepOffset,
  navigationModeFactory
};
//# sourceMappingURL=ng2-archwizard_dist.js.map
