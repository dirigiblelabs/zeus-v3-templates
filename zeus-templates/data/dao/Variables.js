var query = require('db/v3/query');
var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'ZEUS_TEMPLATE_VARIABLES',
	'properties': [
		{
			'name':  'Id',
			'column': 'ZTV_ID',
			'type':'INTEGER',
			'id': true,
			'required': true
		},		{
			'name':  'Name',
			'column': 'ZTV_NAME',
			'type':'VARCHAR',
			'id': false,
			'required': false
		},		{
			'name':  'Value',
			'column': 'ZTV_VALUE',
			'type':'VARCHAR',
			'id': false,
			'required': false
		},		{
			'name':  'Template',
			'column': 'ZTV_TEMPLATE',
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
	var resultSet = query.execute("SELECT COUNT(*) FROM VARIABLES");
	return resultSet !== null ? resultSet[0].COUNT : 0;
};