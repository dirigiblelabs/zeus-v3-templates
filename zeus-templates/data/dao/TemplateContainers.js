var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'ZEUS_TEMPLATE_CONTAINERS',
	'properties': [
		{
			'name':  'Id',
			'column': 'ZTC_ID',
			'type':'INTEGER',
			'id': true,
			'required': true
		},		{
			'name':  'Template',
			'column': 'ZTC_TEMPLATE',
			'type':'INTEGER',
			'id': false,
			'required': true
		},		{
			'name':  'Container',
			'column': 'ZTC_CONTAINER',
			'type':'INTEGER',
			'id': false,
			'required': true
		}]
});

exports.list = function(settings) {
	return dao.list(settings);
};

exports.get = function(id) {
	return dao.find(id);
};

exports.create = function(entity) {
	return dao.insert(entity);
};

exports.update = function(entity) {
	return dao.update(entity);
};

exports.delete = function(id) {
	dao.remove(id);
};