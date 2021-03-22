/* global define:true */
var define;

if (typeof module === 'object' && typeof define !== 'function') {
    define = function (factory) {
        'use strict';
        module.exports = factory(require, exports, module);
    };
}

define(function (/*require, exports, module*/) {
    'use strict';

    /**
     * JaveApi Constructor
     * @param {jQuery} $el            the element being queried.
     * @param {string} behaviourName the name of the behaviour in question.
     */
    var JaveApi = function($el, behaviourName) {
        var opts;

        this.$el     = $el;
        this._prefix = behaviourName.replace(/(\s|_)/g, '-')
                                     .replace(/([a-z])([A-Z])/g, '$1-$2')
                                     .toLowerCase();

        if(this._prefix.substring(0, 1) === '-') {
            this._prefix = this._prefix.substring(1);
        }

        this._prefix += '-';

        opts = this.$el.data(this._prefix + 'options');
        if(!opts) {
            opts = {};
        } else {
            opts = JSON.parse(opts);
        }
        this._options = opts;
    };

    /**
     * Retrieves a value from the element.
     * @param  {string} key the key you want
     * @return {mixed}      the value
     */
    JaveApi.prototype.__value = function(key) {
        var val = this.$el.data(this._prefix + key);
        return typeof val === 'undefined' ? null : val;
    };

    /**
     * Gets an option.
     * @param  {string} what option name.
     * @param  {mixed}  dflt default value.
     * @return {mixed}       the value of the option.
     */
    JaveApi.prototype.get = function(what, dflt) {
        var value = this.__value(what);

        if(value === null && this._options[what] !== undefined) {
            value = this._options[what];
        }

        if(value === null && typeof dflt !== 'undefined') {
            return dflt;
        } else {
            return value;
        }
    };

    /**
     * Gets an option as a specific data-type.
     * @param  {string} what option name.
     * @param  {string} type desired datatype.
     * @param  {mixed}  dflt default value.
     * @return {mixed}       the value of the option.
     */
    JaveApi.prototype.getAs = function(what, type, dflt) {
        var value = this.get(what, dflt);

        switch(type.toLowerCase()) {
            case 'bool':
            case 'boolean':
                value = !!value;
                break;
            case 'int':
            case 'integer':
                value = parseInt(value, 10);
                break;
            case 'float':
                value = parseFloat(value, 10);
                break;
            case 'string':
                value = '' + value;
                break;
        }

        return value;
    };

    return JaveApi;
});
