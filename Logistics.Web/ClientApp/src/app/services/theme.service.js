"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var ThemeService = /** @class */ (function () {
    function ThemeService(overlay) {
        var _this = this;
        this.overlay = overlay;
        this.themes = new rxjs_1.BehaviorSubject([
            { name: 'light-green', display: 'Green' },
            { name: 'dark-green', display: 'Green' },
            { name: 'light-blue', display: 'Blue' },
            { name: 'dark-blue', display: 'Blue' },
            { name: 'light-red', display: 'Red' },
            { name: 'dark-red', display: 'Red' },
            { name: 'light-indigo', display: 'Indigo' },
            { name: 'dark-indigo', display: 'Indigo' },
            { name: 'light-orange', display: 'Orange' },
            { name: 'dark-orange', display: 'Orange' },
            { name: 'light-purple', display: 'Purple' },
            { name: 'dark-purple', display: 'Purple' },
            { name: 'light-amber', display: 'Amber' },
            { name: 'dark-amber', display: 'Amber' },
            { name: 'light-crimson', display: 'Crimson' },
            { name: 'dark-crimson', display: 'Crimson' },
            { name: 'light-teal', display: 'Teal' },
            { name: 'dark-teal', display: 'Teal' }
        ]);
        this.theme = new rxjs_1.BehaviorSubject(this.themes.value[2]);
        this.themes$ = this.themes.asObservable();
        this.theme$ = this.theme.asObservable();
        this.setTheme = function (t) {
            _this.setOverlayContainerTheme(t.name, _this.theme.value.name);
            _this.theme.next(t);
        };
        this.setOverlayContainerTheme = function (newTheme, oldTheme) {
            if (oldTheme) {
                _this.overlay.getContainerElement().classList.remove(oldTheme);
            }
            _this.overlay.getContainerElement().classList.add(newTheme);
        };
        this.setOverlayContainerTheme(this.theme.value.name);
    }
    ThemeService = __decorate([
        core_1.Injectable()
    ], ThemeService);
    return ThemeService;
}());
exports.ThemeService = ThemeService;
//# sourceMappingURL=theme.service.js.map