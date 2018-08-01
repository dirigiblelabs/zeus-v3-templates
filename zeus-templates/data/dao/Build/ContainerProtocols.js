var query = require('db/v3/query');
var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'ZEUS_CONTAINER_PROTOCOLS',
	'properties': [
		{
			'name': 'Id',
			'column': 'CONTAINER_PROTOCOL_ID',
			'type': 'INTEGER',
			'id': true,
			'required': true
		}, {
			'name': 'Name',
			'column': 'CONTAINER_PROTOCOL_NAME',
			'type': 'VARCHAR',
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
	return dao.count();
};

exports.customDataCount = function() {
	var resultSet = query.execute("SELECT COUNT(*) FROM CONTAINERPROTOCOLS");
	return resultSet !== null ? resultSet[0].COUNT : 0;
};