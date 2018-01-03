define(['ojs/ojcore'],
  function(oj, ko, $) {

    function DbiConverter(options) {
      this.Init(options);
    }

    // DbiConverter._DEFAULT_RELATIVE_DATETIME_CONVERTER_OPTIONS =
    // {
    //   'formatUsing' : "displayName",
    //   'dateField' : "relativeField"
    // };

    // Subclass from oj.Object
    oj.Object.createSubclass(DbiConverter, oj.Converter, "DbiConverter");

    // Initializes converter instance with the set options
    DbiConverter.prototype.Init = function(options)
    {
      DbiConverter.superclass.Init.call(this);
      this._options = options;
      // var cf = oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME);
      // this._wrappedConverter = cf.createConverter(options);
    };

    // Returns the options set on the converter instance
    DbiConverter.prototype.getOptions = function()
    {
      return this._options;
    };

    // Does not support parsing
    DbiConverter.prototype.parse = function(value)
    {
      return null;
    };

    // Formats a value using the relative format options. Returns the formatted
    // value and a title that is the actual date, if formatted value is a relative date.
    DbiConverter.prototype.format = function(value)
    {
      return ((100 - value) * -1 ) + " dBi";
    };
    // formats using the base datetime converter
    DbiConverter.prototype.formatRegular = function(value)
    {
      return this.format(value);
    };

    // DbiConverter.prototype._getWrapped = function ()
    // {
    //   return this._wrappedConverter;
    // };

// DbiConverter.prototype._getRelativeOptions = function ()
// {  var i, options = this._options, relativeOptions = {};
//   if (options && options["relativeField"])
//   {
//     relativeOptions['formatUsing'] = "displayName";
//     relativeOptions['dateField'] = options["relativeField"];
//   }
//
//   else
//   {
//     relativeOptions = DbiConverter._DEFAULT_RELATIVE_DATETIME_CONVERTER_OPTIONS;
//   }
//
//   return relativeOptions;
// };

/**
 * A converter factory for "relativeDate" that supports custom
 * formatting of normal and relative date times.
 */
DbiConverterFactory = (function () {
  /**
  * Private function that takes regular and relative options.
  *
  * @param {Object} options
  * @return {Object}
  * @private
  */
  function _createDbiConverter(options)
  {
    return new DbiConverter(options);
  }

  return {
    'createConverter': function (options) {
      return _createDbiConverter(options);
    }
  };
}());

    //return new DbiConverter();
 }

);
