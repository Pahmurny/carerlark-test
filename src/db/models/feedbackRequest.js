export default (sequelize, DataTypes) => {
  const FeedbackRequest = sequelize.define('FeedbackRequest', {
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
    qusetion_type_enum: {
      type: DataTypes.STRING(100),
    },
    question: {
      type: DataTypes.STRING(124),
    },
    send_to_type_enum: {
      type: DataTypes.STRING(100),
    },
    is_unsolicited: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_anonymous: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    expires: {
      type: DataTypes.DATE,
    },
  }, {
    schema: 'public',
    tableName: 'feedback_request',
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created',
    updatedAt: 'updated',
  });

  FeedbackRequest.associate = (models) => {
    FeedbackRequest.belongsTo(models.User, {
      targetKey: 'id',
      foreignKey: 'requester_id',
      as: 'requester',
    });
    FeedbackRequest.belongsTo(models.User, {
      targetKey: 'id',
      foreignKey: 'person_about_id',
      as: 'person_about',
    });
    FeedbackRequest.hasMany(models.Feedback, {
      foreignKey: 'request_id',
      as: 'feedbacks',
    });
    FeedbackRequest.hasMany(models.RequestGiver, {
      foreignKey: 'request_id',
      as: 'request_givers',
    });
    FeedbackRequest.belongsToMany(models.User, {
      foreignKey: 'request_id',
      otherKey: 'giver_id',
      through: models.RequestGiver,
      as: { singular: 'giver', plural: 'givers' },
    });
  };

  return FeedbackRequest;
};
