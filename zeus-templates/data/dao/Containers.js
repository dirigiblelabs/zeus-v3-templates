var query = require('db/v3/query');
var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'ZEUS_CONTAINERS',
	'properties': [
		{
			'name':  'Id',
			'column': 'ZC_ID',
			'type':'INTEGER',
			'id': true,
			'required': false
		},		{
			'name':  'Name',
			'column': 'ZC_NAME',
			'type':'VARCHAR',
			'id': false,
			'required': false
		},		{
			'name':  'Image',
			'column': 'ZC_IMAGE',
			'type':'VARCHAR',
			'id': false,
			'required': false
		},		{
			'name':  'Protocol',
			'column': 'ZC_PROTOCOL',
			'type':'INTEGER',
			'id': false,
			'required': false
		},		{
			'name':  'Port',
			'column': 'ZC_PORT',
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
	var resultSet = query.execute("SELECT COUNT(*) AS COUNT FROM ZEUS_CONTAINERS");
	return resultSet !== null ? resultSet[0].COUNT : 0;
};