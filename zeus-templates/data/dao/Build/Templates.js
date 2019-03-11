var query = require("db/v3/query");
var producer = require("messaging/v3/producer");
var daoApi = require("db/v3/dao");
var dao = daoApi.create({
	table: "ZEUS_TEMPLATES",
	properties: [
		{
			name: "Id",
			column: "TEMPLATE_ID",
			type: "INTEGER",
			id: true,
			required: true
		}, {
			name: "Name",
			column: "TEMPLATE_NAME",
			type: "VARCHAR",
			required: true
		}, {
			name: "IsStateful",
			column: "TEMPLATE_IS_STATEFUL",
			type: "BOOLEAN",
			required: true
		}, {
			name: "Replicas",
			column: "TEMPLATE_REPLICAS",
			type: "INTEGER",
			required: true
		}, {
			name: "MountPath",
			column: "TEMPLATE_MOUNT_PATH",
			type: "VARCHAR",
		}]
});
exports.list = function(settings) {
	return dao.list(settings);
};

exports.get = function(id) {
	return dao.find(id);
};

exports.create = function(entity) {
	var id = dao.insert(entity);
	triggerEvent("Create", {
		table: "ZEUS_TEMPLATES",
		key: {
			name: "Id",
			column: "TEMPLATE_ID",
			value: id
		}
	});
	return id;
};

exports.update = function(entity) {
	dao.update(entity);
	triggerEvent("Update", {
		table: "ZEUS_TEMPLATES",
		key: {
			name: "Id",
			column: "TEMPLATE_ID",
			value: entity.Id
		}
	});
};

exports.delete = function(id) {
	dao.remove(id);
	triggerEvent("Delete", {
		table: "ZEUS_TEMPLATES",
		key: {
			name: "Id",
			column: "TEMPLATE_ID",
			value: id
		}
	});
};

exports.count = function() {
	return dao.count();
};

exports.customDataCount = function() {
	var resultSet = query.execute("SELECT COUNT(*) AS COUNT FROM ZEUS_TEMPLATES");
	if (resultSet !== null && resultSet[0] !== null) {
		if (resultSet[0].COUNT !== undefined && resultSet[0].COUNT !== null) {
			return resultSet[0].COUNT;
		} else if (resultSet[0].count !== undefined && resultSet[0].count !== null) {
			return resultSet[0].count;
		}
	}
	return 0;
};

function triggerEvent(operation, data) {
	producer.queue("zeus-templates/Build/Templates/" + operation).send(JSON.stringify(data));
}