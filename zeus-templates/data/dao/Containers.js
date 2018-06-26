var query = require('db/v3/query');
var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'ZEUS_CONTAINERS',
	'properties': [
		{
			'name': 'Id',
			'column': 'CONTAINER_ID',
			'type': 'INTEGER',
			'id': true,
			'required': true
		}, {
			'name': 'Name',
			'column': 'CONTAINER_NAME',
			'type': 'VARCHAR',
			'required': true
		}, {
			'name': 'Image',
			'column': 'CONTAINER_IMAGE',
			'type': 'VARCHAR',
			'required': true
		}, {
			'name': 'Protocol',
			'column': 'CONTAINER_PROTOCOL',
			'type': 'INTEGER',
			'required': true
		}, {
			'name': 'Port',
			'column': 'CONTAINER_PORT',
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
	var resultSet = query.execute("SELECT COUNT(*) AS COUNT FROM ZEUS_CONTAINERS");
	return resultSet !== null ? resultSet[0].COUNT : 0;
};