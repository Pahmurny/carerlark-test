export default (sequelize, DataTypes) => {
  const RequestGiver = sequelize.define('RequestGiver', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    created: {
      field: 'created',
      type: DataTypes.DATE,
    },
    updated: {
      field: 'updated',
      type: DataTypes.DATE,
    },
    is_finished: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    schema: 'public',
    tableName: 'request_giver',
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created',
    updatedAt: 'updated',
  });

  RequestGiver.associate = (models) => {
    RequestGiver.belongsTo(models.User, {
      targetKey: 'id',
      foreignKey: 'giver_id',
      as: 'request_giver',
    });
    RequestGiver.belongsTo(models.FeedbackRequest, {
      targetKey: 'id',
      foreignKey: 'request_id',
      as: 'request',
    });
  };

  return RequestGiver;
};
