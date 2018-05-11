/*
 * Copyright (c) 2017 SAP and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 * Contributors:
 * SAP - initial API and implementation
 */

var extensions = require('core/v3/extensions');
var response = require('http/v3/response');

var views = [];
var viewExtensions = extensions.getExtensions('shell-zeus-templates-view');
for (var i = 0; i < viewExtensions.length; i++) {
    var viewExtension = require(viewExtensions[i]);
    var view = viewExtension.getView();
    views.push(view);
}

response.println(JSON.stringify(views));
