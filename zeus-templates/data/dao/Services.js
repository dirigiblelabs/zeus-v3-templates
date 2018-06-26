var query = require('db/v3/query');
var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'ZEUS_TEMPLATE_SERVICES',
	'properties': [
		{
			'name':  'Id',
			'column': 'TEMPLATE_SERVICE_ID',
			'type':'INTEGER',
			'id': true,
			'required': true
		},		{
			'name':  'Name',
			'column': 'TEMPLATE_SERVICE_NAME',
			'type':'VARCHAR',
			'id': false,
			'required': true
		},		{
			'name':  'Type',
			'column': 'TEMPLATE_SERVICE_TYPE',
			'type':'INTEGER',
			'id': false,
			'required': true
		},		{
			'name':  'Port',
			'column': 'TEMPLATE_SERVICE_PORT',
			'type':'INTEGER',
			'id': false,
			'required': true
		},		{
			'name':  'Template',
			'column': 'TEMPLATE_SERVICE_TEMPLATE',
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

exports.count = function() {
	var resultSet = query.execute("SELECT COUNT(*) FROM SERVICES");
	return resultSet !== null ? resultSet[0].COUNT : 0;
};