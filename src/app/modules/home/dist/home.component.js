"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HomeComponent = void 0;
var core_1 = require("@angular/core");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(productService, productCategoryService) {
        this.productService = productService;
        this.productCategoryService = productCategoryService;
        this.loader = false;
        this.products = [];
        this.productCategory = [];
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.getProductCategory();
        this.getProductList();
    };
    HomeComponent.prototype.getProductList = function () {
        var _this = this;
        this.loader = true;
        this.productService.getProducts()
            .subscribe(function (data) {
            _this.loader = false;
            _this.products = data;
        }, function (error) {
            console.log(error.message);
            _this.loader = false;
        });
    };
    HomeComponent.prototype.getProductCategory = function () {
        var _this = this;
        this.loader = true;
        this.productCategoryService.getProductCategory()
            .subscribe(function (data) {
            _this.productCategory = data;
            console.log(data);
        }, function (error) {
            console.log(error.message);
        });
    };
    HomeComponent.prototype.getProductsByCategory = function (categoryId) {
        var _this = this;
        this.productCategoryService.getProductsByCategoryId(categoryId)
            .subscribe(function (data) {
            _this.loader = false;
            _this.products = [];
            _this.products = data;
            console.log(data);
        }, function (error) {
            _this.loader = false;
            console.log(error.message);
        });
    };
    HomeComponent.prototype.checkProduct = function (product) {
        this.selectedProduct = product;
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.scss']
        })
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
