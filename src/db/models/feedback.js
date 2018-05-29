export default (sequelize, DataTypes) => {
  const Feedback = sequelize.define('Feedback', {
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
    comment: {
      type: DataTypes.STRING(3000),
    },
    is_anonymous: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_private: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    employee_acknowledgment: {
      type: DataTypes.STRING(3000),
    },
    manager_acknowledgment: {
      type: DataTypes.STRING(3000),
    },
    delivered: {
      type: DataTypes.DATE,
    },
    qusetion_type_enum: {
      type: DataTypes.STRING(100),
    },
    question: {
      type: DataTypes.STRING(124),
    },
  }, {
    schema: 'public',
    tableName: 'feedback',
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created',
    updatedAt: 'updated',
  });

  Feedback.associate = (models) => {
    Feedback.belongsTo(models.User, {
      targetKey: 'id',
      foreignKey: 'requester_id',
      as: 'requester',
    });
    Feedback.belongsTo(models.User, {
      targetKey: 'id',
      foreignKey: 'giver_id',
      as: 'giver',
    });
    Feedback.belongsTo(models.User, {
      targetKey: 'id',
      foreignKey: 'receiver_id',
      as: 'receiver',
    });
    Feedback.belongsTo(models.User, {
      targetKey: 'id',
      foreignKey: 'person_about_id',
      as: 'person_about',
    });
    Feedback.belongsTo(models.FeedbackRequest, {
      targetKey: 'id',
      foreignKey: 'request_id',
      as: 'request',
    });
  };

  return Feedback;
};
