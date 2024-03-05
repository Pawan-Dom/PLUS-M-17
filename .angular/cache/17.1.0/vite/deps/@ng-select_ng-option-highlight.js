import {
  Directive,
  ElementRef,
  Input,
  InputFlags,
  NgModule,
  Renderer2,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵdefineDirective,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject
} from "./chunk-R32D6M7N.js";
import "./chunk-GFVJDENN.js";
import "./chunk-QOAHSALO.js";
import "./chunk-LOA65BFQ.js";
import "./chunk-ASLTLD6L.js";

// node_modules/@ng-select/ng-option-highlight/fesm2022/ng-select-ng-option-highlight.mjs
var _NgOptionHighlightDirective = class _NgOptionHighlightDirective {
  constructor(elementRef, renderer) {
    this.elementRef = elementRef;
    this.renderer = renderer;
    this.element = this.elementRef.nativeElement;
  }
  ngOnChanges() {
    if (this._canHighlight) {
      this._highlightLabel();
    }
  }
  ngAfterViewInit() {
    this.label = this.element.innerHTML;
    if (this._canHighlight) {
      this._highlightLabel();
    }
  }
  _escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  _highlightLabel() {
    const label = this.label;
    if (!this.term) {
      this._setInnerHtml(label);
      return;
    }
    const alternationString = this._escapeRegExp(this.term).replace(" ", "|");
    const termRegex = new RegExp(alternationString, "gi");
    this._setInnerHtml(label.replace(termRegex, `<span class="highlighted">$&</span>`));
  }
  get _canHighlight() {
    return this._isDefined(this.term) && this._isDefined(this.label);
  }
  _setInnerHtml(html) {
    this.renderer.setProperty(this.elementRef.nativeElement, "innerHTML", html);
  }
  _isDefined(value) {
    return value !== void 0 && value !== null;
  }
};
_NgOptionHighlightDirective.ɵfac = function NgOptionHighlightDirective_Factory(t) {
  return new (t || _NgOptionHighlightDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2));
};
_NgOptionHighlightDirective.ɵdir = ɵɵdefineDirective({
  type: _NgOptionHighlightDirective,
  selectors: [["", "ngOptionHighlight", ""]],
  inputs: {
    term: [InputFlags.None, "ngOptionHighlight", "term"]
  },
  features: [ɵɵNgOnChangesFeature]
});
var NgOptionHighlightDirective = _NgOptionHighlightDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgOptionHighlightDirective, [{
    type: Directive,
    args: [{
      selector: "[ngOptionHighlight]"
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: Renderer2
  }], {
    term: [{
      type: Input,
      args: ["ngOptionHighlight"]
    }]
  });
})();
var _NgOptionHighlightModule = class _NgOptionHighlightModule {
};
_NgOptionHighlightModule.ɵfac = function NgOptionHighlightModule_Factory(t) {
  return new (t || _NgOptionHighlightModule)();
};
_NgOptionHighlightModule.ɵmod = ɵɵdefineNgModule({
  type: _NgOptionHighlightModule,
  declarations: [NgOptionHighlightDirective],
  exports: [NgOptionHighlightDirective]
});
_NgOptionHighlightModule.ɵinj = ɵɵdefineInjector({});
var NgOptionHighlightModule = _NgOptionHighlightModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgOptionHighlightModule, [{
    type: NgModule,
    args: [{
      declarations: [NgOptionHighlightDirective],
      exports: [NgOptionHighlightDirective]
    }]
  }], null, null);
})();
export {
  NgOptionHighlightDirective,
  NgOptionHighlightModule
};
//# sourceMappingURL=@ng-select_ng-option-highlight.js.map
