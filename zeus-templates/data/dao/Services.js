var query = require('db/v3/query');
var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'ZEUS_TEMPLATE_SERVICES',
	'properties': [
		{
			'name':  'Id',
			'column': 'ZTS_ID',
			'type':'INTEGER',
			'id': true,
			'required': false
		},		{
			'name':  'Name',
			'column': 'ZTS_NAME',
			'type':'VARCHAR',
			'id': false,
			'required': false
		},		{
			'name':  'Type',
			'column': 'ZTS_TYPE',
			'type':'INTEGER',
			'id': false,
			'required': false
		},		{
			'name':  'Port',
			'column': 'ZTS_PORT',
			'type':'INTEGER',
			'id': false,
			'required': false
		},		{
			'name':  'Template',
			'column': 'ZTS_TEMPLATE',
			'type':'INTEGER',
			'id': false,
			'required': false
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