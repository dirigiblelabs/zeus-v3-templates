var query = require('db/v3/query');
var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'ZEUS_TEMPLATES',
	'properties': [
		{
			'name':  'Id',
			'column': 'ZT_ID',
			'type':'INTEGER',
			'id': true,
			'required': false
		},		{
			'name':  'Name',
			'column': 'ZT_NAME',
			'type':'VARCHAR',
			'id': false,
			'required': false
		},		{
			'name':  'IsStateful',
			'column': 'ZT_IS_STATEFUL',
			'type':'BOOLEAN',
			'id': false,
			'required': false
		},		{
			'name':  'Replicas',
			'column': 'ZT_REPLICAS',
			'type':'INTEGER',
			'id': false,
			'required': false
		},		{
			'name':  'MountPath',
			'column': 'ZT_MOUNT_PATH',
			'type':'VARCHAR',
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
	var resultSet = query.execute("SELECT COUNT(*) AS COUNT FROM ZEUS_TEMPLATES");
	return resultSet !== null ? resultSet[0].COUNT : 0;
};