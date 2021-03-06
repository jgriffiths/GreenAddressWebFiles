/*
************************************************************************
Copyright (c) 2013 UBINITY SAS

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*************************************************************************
*/

require('Sandbox');
require('ChromeapiPlugupCardTerminal');

var ChromeapiPlugupCardTerminalFactory = Class.extend(CardTerminalFactory, {
	/** @lends ChromeapiPlugupCardTerminalFactory.prototype */

	/**
	 *  @class Implementation of the {@link CardTerminalFactory} using the Chrome API for Plug-up Dongle
	 *  @constructs
	 *  @augments CardTerminalFactory
	 */
	initialize: function(pid) {
		this.pid = pid;
	},

	list_async: function() {
		if (typeof chromeDevice == "undefined") {
			throw "Content script is not available";
		}
		return chromeDevice.enumerateDongles_async(this.pid)
		       .then(function(result) {
		       		return result.deviceList;
		       });
	},

	waitInserted: function() {
		throw "Not implemented"
	},

	getCardTerminal: function(device) {
		return new ChromeapiPlugupCardTerminal(device);
	}
});
