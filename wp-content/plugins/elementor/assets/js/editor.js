/*! elementor - v2.5.16 - 28-05-2019 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 43);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ControlBaseView = __webpack_require__(3),
    TagsBehavior = __webpack_require__(57),
    Validator = __webpack_require__(9),
    ControlBaseDataView;

ControlBaseDataView = ControlBaseView.extend({

	ui: function ui() {
		var ui = ControlBaseView.prototype.ui.apply(this, arguments);

		_.extend(ui, {
			input: 'input[data-setting][type!="checkbox"][type!="radio"]',
			checkbox: 'input[data-setting][type="checkbox"]',
			radio: 'input[data-setting][type="radio"]',
			select: 'select[data-setting]',
			textarea: 'textarea[data-setting]',
			responsiveSwitchers: '.elementor-responsive-switcher',
			contentEditable: '[contenteditable="true"]',
			tooltipTarget: '.tooltip-target'
		});

		return ui;
	},

	templateHelpers: function templateHelpers() {
		var controlData = ControlBaseView.prototype.templateHelpers.apply(this, arguments);

		controlData.data.controlValue = this.getControlValue();

		return controlData;
	},

	events: function events() {
		return {
			'input @ui.input': 'onBaseInputChange',
			'change @ui.checkbox': 'onBaseInputChange',
			'change @ui.radio': 'onBaseInputChange',
			'input @ui.textarea': 'onBaseInputChange',
			'change @ui.select': 'onBaseInputChange',
			'input @ui.contentEditable': 'onBaseInputChange',
			'click @ui.responsiveSwitchers': 'onResponsiveSwitchersClick'
		};
	},

	behaviors: function behaviors() {
		var behaviors = {},
		    dynamicSettings = this.options.model.get('dynamic');

		if (dynamicSettings && dynamicSettings.active) {
			var tags = _.filter(elementor.dynamicTags.getConfig('tags'), function (tag) {
				return _.intersection(tag.categories, dynamicSettings.categories).length;
			});

			if (tags.length) {
				behaviors.tags = {
					behaviorClass: TagsBehavior,
					tags: tags,
					dynamicSettings: dynamicSettings
				};
			}
		}

		return behaviors;
	},

	initialize: function initialize() {
		ControlBaseView.prototype.initialize.apply(this, arguments);

		this.registerValidators();

		this.listenTo(this.elementSettingsModel, 'change:external:' + this.model.get('name'), this.onAfterExternalChange);
	},

	getControlValue: function getControlValue() {
		return this.elementSettingsModel.get(this.model.get('name'));
	},

	setValue: function setValue(value) {
		this.setSettingsModel(value);
	},

	setSettingsModel: function setSettingsModel(value) {
		this.elementSettingsModel.set(this.model.get('name'), value);

		this.triggerMethod('settings:change');
	},

	applySavedValue: function applySavedValue() {
		this.setInputValue('[data-setting="' + this.model.get('name') + '"]', this.getControlValue());
	},

	getEditSettings: function getEditSettings(setting) {
		var settings = this.getOption('elementEditSettings').toJSON();

		if (setting) {
			return settings[setting];
		}

		return settings;
	},

	setEditSetting: function setEditSetting(settingKey, settingValue) {
		var settings = this.getOption('elementEditSettings');

		settings.set(settingKey, settingValue);
	},

	getInputValue: function getInputValue(input) {
		var $input = this.$(input);

		if ($input.is('[contenteditable="true"]')) {
			return $input.html();
		}

		var inputValue = $input.val(),
		    inputType = $input.attr('type');

		if (-1 !== ['radio', 'checkbox'].indexOf(inputType)) {
			return $input.prop('checked') ? inputValue : '';
		}

		if ('number' === inputType && _.isFinite(inputValue)) {
			return +inputValue;
		}

		// Temp fix for jQuery (< 3.0) that return null instead of empty array
		if ('SELECT' === input.tagName && $input.prop('multiple') && null === inputValue) {
			inputValue = [];
		}

		return inputValue;
	},

	setInputValue: function setInputValue(input, value) {
		var $input = this.$(input),
		    inputType = $input.attr('type');

		if ('checkbox' === inputType) {
			$input.prop('checked', !!value);
		} else if ('radio' === inputType) {
			$input.filter('[value="' + value + '"]').prop('checked', true);
		} else {
			$input.val(value);
		}
	},

	addValidator: function addValidator(validator) {
		this.validators.push(validator);
	},

	registerValidators: function registerValidators() {
		this.validators = [];

		var validationTerms = {};

		if (this.model.get('required')) {
			validationTerms.required = true;
		}

		if (!jQuery.isEmptyObject(validationTerms)) {
			this.addValidator(new Validator({
				validationTerms: validationTerms
			}));
		}
	},

	onRender: function onRender() {
		ControlBaseView.prototype.onRender.apply(this, arguments);

		if (this.model.get('responsive')) {
			this.renderResponsiveSwitchers();
		}

		this.applySavedValue();

		this.triggerMethod('ready');

		this.toggleControlVisibility();

		this.addTooltip();
	},

	onBaseInputChange: function onBaseInputChange(event) {
		clearTimeout(this.correctionTimeout);

		var input = event.currentTarget,
		    value = this.getInputValue(input),
		    validators = this.validators.slice(0),
		    settingsValidators = this.elementSettingsModel.validators[this.model.get('name')];

		if (settingsValidators) {
			validators = validators.concat(settingsValidators);
		}

		if (validators) {
			var oldValue = this.getControlValue(input.dataset.setting);

			var isValidValue = validators.every(function (validator) {
				return validator.isValid(value, oldValue);
			});

			if (!isValidValue) {
				this.correctionTimeout = setTimeout(this.setInputValue.bind(this, input, oldValue), 1200);

				return;
			}
		}

		this.updateElementModel(value, input);

		this.triggerMethod('input:change', event);
	},

	onResponsiveSwitchersClick: function onResponsiveSwitchersClick(event) {
		var device = jQuery(event.currentTarget).data('device');

		this.triggerMethod('responsive:switcher:click', device);

		elementor.changeDeviceMode(device);
	},

	renderResponsiveSwitchers: function renderResponsiveSwitchers() {
		var templateHtml = Marionette.Renderer.render('#tmpl-elementor-control-responsive-switchers', this.model.attributes);

		this.ui.controlTitle.after(templateHtml);
	},

	onAfterExternalChange: function onAfterExternalChange() {
		this.hideTooltip();

		this.applySavedValue();
	},

	addTooltip: function addTooltip() {
		if (!this.ui.tooltipTarget) {
			return;
		}

		// Create tooltip on controls
		this.ui.tooltipTarget.tipsy({
			gravity: function gravity() {
				// `n` for down, `s` for up
				var gravity = jQuery(this).data('tooltip-pos');

				if (undefined !== gravity) {
					return gravity;
				}
				return 'n';
			},
			title: function title() {
				return this.getAttribute('data-tooltip');
			}
		});
	},

	hideTooltip: function hideTooltip() {
		if (this.ui.tooltipTarget) {
			this.ui.tooltipTarget.tipsy('hide');
		}
	},

	updateElementModel: function updateElementModel(value) {
		this.setValue(value);
	}
}, {
	// Static methods
	getStyleValue: function getStyleValue(placeholder, controlValue, controlData) {
		if ('DEFAULT' === placeholder) {
			return controlData.default;
		}

		return controlValue;
	},

	onPasteStyle: function onPasteStyle() {
		return true;
	}
});

module.exports = ControlBaseDataView;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var userAgent = navigator.userAgent;

exports.default = {
	webkit: -1 !== userAgent.indexOf('AppleWebKit'),
	firefox: -1 !== userAgent.indexOf('Firefox'),
	ie: /Trident|MSIE/.test(userAgent),
	edge: -1 !== userAgent.indexOf('Edge'),
	mac: -1 !== userAgent.indexOf('Macintosh')
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var ControlBaseDataView = __webpack_require__(0),
    ControlBaseMultipleItemView;

ControlBaseMultipleItemView = ControlBaseDataView.extend({

	applySavedValue: function applySavedValue() {
		var values = this.getControlValue(),
		    $inputs = this.$('[data-setting]'),
		    self = this;

		_.each(values, function (value, key) {
			var $input = $inputs.filter(function () {
				return key === this.dataset.setting;
			});

			self.setInputValue($input, value);
		});
	},

	getControlValue: function getControlValue(key) {
		var values = this.elementSettingsModel.get(this.model.get('name'));

		if (!jQuery.isPlainObject(values)) {
			return {};
		}

		if (key) {
			var value = values[key];

			if (undefined === value) {
				value = '';
			}

			return value;
		}

		return elementorCommon.helpers.cloneObject(values);
	},

	setValue: function setValue(key, value) {
		var values = this.getControlValue();

		if ('object' === (typeof key === 'undefined' ? 'undefined' : _typeof(key))) {
			_.each(key, function (internalValue, internalKey) {
				values[internalKey] = internalValue;
			});
		} else {
			values[key] = value;
		}

		this.setSettingsModel(values);
	},

	updateElementModel: function updateElementModel(value, input) {
		var key = input.dataset.setting;

		this.setValue(key, value);
	}
}, {
	// Static methods
	getStyleValue: function getStyleValue(placeholder, controlValue) {
		if (!_.isObject(controlValue)) {
			return ''; // invalid
		}

		return controlValue[placeholder.toLowerCase()];
	}
});

module.exports = ControlBaseMultipleItemView;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ControlBaseView;

ControlBaseView = Marionette.CompositeView.extend({
	ui: function ui() {
		return {
			controlTitle: '.elementor-control-title'
		};
	},

	behaviors: function behaviors() {
		var behaviors = {};

		return elementor.hooks.applyFilters('controls/base/behaviors', behaviors, this);
	},

	getBehavior: function getBehavior(name) {
		return this._behaviors[Object.keys(this.behaviors()).indexOf(name)];
	},

	className: function className() {
		// TODO: Any better classes for that?
		var classes = 'elementor-control elementor-control-' + this.model.get('name') + ' elementor-control-type-' + this.model.get('type'),
		    modelClasses = this.model.get('classes'),
		    responsive = this.model.get('responsive');

		if (!_.isEmpty(modelClasses)) {
			classes += ' ' + modelClasses;
		}

		if (!_.isEmpty(responsive)) {
			classes += ' elementor-control-responsive-' + responsive.max;
		}

		return classes;
	},

	templateHelpers: function templateHelpers() {
		var controlData = {
			_cid: this.model.cid
		};

		return {
			data: _.extend({}, this.model.toJSON(), controlData)
		};
	},

	getTemplate: function getTemplate() {
		return Marionette.TemplateCache.get('#tmpl-elementor-control-' + this.model.get('type') + '-content');
	},

	initialize: function initialize(options) {
		this.elementSettingsModel = options.elementSettingsModel;

		var controlType = this.model.get('type'),
		    controlSettings = jQuery.extend(true, {}, elementor.config.controls[controlType], this.model.attributes);

		this.model.set(controlSettings);

		this.listenTo(this.elementSettingsModel, 'change', this.toggleControlVisibility);
	},

	toggleControlVisibility: function toggleControlVisibility() {
		var isVisible = elementor.helpers.isActiveControl(this.model, this.elementSettingsModel.attributes);

		this.$el.toggleClass('elementor-hidden-control', !isVisible);

		elementor.getPanelView().updateScrollbar();
	},

	onRender: function onRender() {
		var layoutType = this.model.get('label_block') ? 'block' : 'inline',
		    showLabel = this.model.get('show_label'),
		    elClasses = 'elementor-label-' + layoutType;

		elClasses += ' elementor-control-separator-' + this.model.get('separator');

		if (!showLabel) {
			elClasses += ' elementor-control-hidden-label';
		}

		this.$el.addClass(elClasses);

		this.toggleControlVisibility();
	}
});

module.exports = ControlBaseView;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ControlBaseDataView = __webpack_require__(0),
    ControlSelect2ItemView;

ControlSelect2ItemView = ControlBaseDataView.extend({
	getSelect2Placeholder: function getSelect2Placeholder() {
		return this.ui.select.children('option:first[value=""]').text();
	},

	getSelect2DefaultOptions: function getSelect2DefaultOptions() {
		return {
			allowClear: true,
			placeholder: this.getSelect2Placeholder(),
			dir: elementorCommon.config.isRTL ? 'rtl' : 'ltr'
		};
	},

	getSelect2Options: function getSelect2Options() {
		return jQuery.extend(this.getSelect2DefaultOptions(), this.model.get('select2options'));
	},

	onReady: function onReady() {
		this.ui.select.select2(this.getSelect2Options());
	},

	onBeforeDestroy: function onBeforeDestroy() {
		if (this.ui.select.data('select2')) {
			this.ui.select.select2('destroy');
		}

		this.$el.remove();
	}
});

module.exports = ControlSelect2ItemView;

/***/ }),
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _environment = __webpack_require__(1);

var _environment2 = _interopRequireDefault(_environment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ControlsCSSParser = __webpack_require__(10),
    Validator = __webpack_require__(9),
    BaseContainer = __webpack_require__(26),
    BaseElementView;

BaseElementView = BaseContainer.extend({
	tagName: 'div',

	controlsCSSParser: null,

	allowRender: true,

	toggleEditTools: false,

	renderAttributes: {},

	className: function className() {
		var classes = 'elementor-element elementor-element-edit-mode ' + this.getElementUniqueID();

		if (this.toggleEditTools) {
			classes += ' elementor-element--toggle-edit-tools';
		}

		return classes;
	},

	attributes: function attributes() {
		return {
			'data-id': this.getID(),
			'data-element_type': this.model.get('elType')
		};
	},

	ui: function ui() {
		return {
			tools: '> .elementor-element-overlay > .elementor-editor-element-settings',
			editButton: '> .elementor-element-overlay .elementor-editor-element-edit',
			duplicateButton: '> .elementor-element-overlay .elementor-editor-element-duplicate',
			addButton: '> .elementor-element-overlay .elementor-editor-element-add',
			removeButton: '> .elementor-element-overlay .elementor-editor-element-remove'
		};
	},

	behaviors: function behaviors() {
		var groups = elementor.hooks.applyFilters('elements/' + this.options.model.get('elType') + '/contextMenuGroups', this.getContextMenuGroups(), this);

		var behaviors = {
			contextMenu: {
				behaviorClass: __webpack_require__(8),
				groups: groups
			}
		};

		return elementor.hooks.applyFilters('elements/base/behaviors', behaviors, this);
	},

	getBehavior: function getBehavior(name) {
		return this._behaviors[Object.keys(this.behaviors()).indexOf(name)];
	},

	events: function events() {
		return {
			mousedown: 'onMouseDown',
			'click @ui.editButton': 'onEditButtonClick',
			'click @ui.duplicateButton': 'onDuplicateButtonClick',
			'click @ui.addButton': 'onAddButtonClick',
			'click @ui.removeButton': 'onRemoveButtonClick'
		};
	},

	getElementType: function getElementType() {
		return this.model.get('elType');
	},

	getIDInt: function getIDInt() {
		return parseInt(this.getID(), 16);
	},

	getChildType: function getChildType() {
		return elementor.helpers.getElementChildType(this.getElementType());
	},

	getChildView: function getChildView(model) {
		var ChildView,
		    elType = model.get('elType');

		if ('section' === elType) {
			ChildView = __webpack_require__(27);
		} else if ('column' === elType) {
			ChildView = __webpack_require__(96);
		} else {
			ChildView = elementor.modules.elements.views.Widget;
		}

		return elementor.hooks.applyFilters('element/view', ChildView, model, this);
	},

	getTemplateType: function getTemplateType() {
		return 'js';
	},

	getEditModel: function getEditModel() {
		return this.model;
	},

	getContextMenuGroups: function getContextMenuGroups() {
		var controlSign = _environment2.default.mac ? '⌘' : '^';

		return [{
			name: 'general',
			actions: [{
				name: 'edit',
				icon: 'eicon-edit',
				title: elementor.translate('edit_element', [this.options.model.getTitle()]),
				callback: this.options.model.trigger.bind(this.options.model, 'request:edit')
			}, {
				name: 'duplicate',
				icon: 'eicon-clone',
				title: elementor.translate('duplicate'),
				shortcut: controlSign + '+D',
				callback: this.duplicate.bin