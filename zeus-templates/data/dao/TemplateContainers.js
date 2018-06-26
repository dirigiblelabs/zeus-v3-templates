var query = require('db/v3/query');
var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'ZEUS_TEMPLATE_CONTAINERS',
	'properties': [
		{
			'name': 'Id',
			'column': 'TEMPLATE_CONTAINER_ID',
			'type': 'INTEGER',
			'id': true,
			'required': true
		}, {
			'name': 'Template',
			'column': 'TEMPLATE_CONTAINER_TEMPLATE',
			'type': 'INTEGER',
			'required': true
		}, {
			'name': 'Container',
			'column': 'TEMPLATE_CONTAINER_CONTAINER',
			'type': 'INTEGER',
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
	var resultSet = query.execute("SELECT COUNT(*) FROM TEMPLATECONTAINERS");
	return resultSet !== null ? resultSet[0].COUNT : 0;
};