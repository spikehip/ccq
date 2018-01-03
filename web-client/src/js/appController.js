/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your application specific code will go here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojgauge', 'DbiConverter'],
  function(oj, ko, $) {
     function ControllerViewModel() {
       var apiEndpoint = "https://ccq.bikeonet.hu";
       var self = this;
       self.ccq  = ko.observable();
       self.thresholdValues = [{max: 33}, {max: 90}, {}];

       this.customMetricLabel = {rendered:'on',textType: 'percent',
                                  style:{fontWeight:'bold',color:'black'}};

       oj.Validation.converterFactory('dbiConverter', DbiConverterFactory);
       var converterFactory = oj.Validation.converterFactory("dbiConverter");

       this.dbiConverter = {rendered:'on',
        converter: converterFactory.createConverter({})};


       self.signal  = ko.observable();
       self.signalLabel = ko.observable();
       self.thresholdValuesSignal = [{max: 33}, {max: 66}, {}];

       self.tx = ko.observable();
       self.rx = ko.observable();

      // Media queries for repsonsive layouts
      var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
      self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);

      // Header
      // Application Name used in Branding Area

	$.getJSON(apiEndpoint+"/api/ccq").
              then(function (data) {
		  console.log(data);
		  self.ccq(data.ccq / 10);
              });


	$.getJSON(apiEndpoint+"/api/signal").
              then(function (data) {
      console.log(data);
      self.signalLabel(data.signal);
		  self.signal(100 - (data.signal * -1));
              });

  $.getJSON(apiEndpoint+"/api/tx_rate").
              then(function (data) {
		  console.log(data);
		  self.tx(parseInt(data.tx_rate));
              });

  $.getJSON(apiEndpoint+"/api/rx_rate").
              then(function (data) {
  	  console.log(data);
  	  self.rx(parseInt(data.rx_rate));
              });


      self.appName = ko.observable("CCQ Web Client");
      // User Info used in Global Navigation area
      self.userLogin = ko.observable("john.hancock@oracle.com");

      // Footer
      function footerLink(name, id, linkTarget) {
        this.name = name;
        this.linkId = id;
        this.linkTarget = linkTarget;
      }
      self.footerLinks = ko.observableArray([
        new footerLink('About Oracle', 'aboutOracle', 'http://www.oracle.com/us/corporate/index.html#menu-about'),
        new footerLink('Contact Us', 'contactUs', 'http://www.oracle.com/us/corporate/contact/index.html'),
        new footerLink('Legal Notices', 'legalNotices', 'http://www.oracle.com/us/legal/index.html'),
        new footerLink('Terms Of Use', 'termsOfUse', 'http://www.oracle.com/us/legal/terms/index.html'),
        new footerLink('Your Privacy Rights', 'yourPrivacyRights', 'http://www.oracle.com/us/legal/privacy/index.html')
      ]);
     };

     return new ControllerViewModel();
  }

);
