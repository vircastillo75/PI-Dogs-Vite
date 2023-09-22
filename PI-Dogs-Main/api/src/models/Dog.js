const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dog', {
    id:{
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    height:{
      type: DataTypes.STRING,
      allowNull: false,
      get(){
        return JSON.parse(this.getDataValue("height"));
      },
      set(value){
        this.setDataValue("height", JSON.stringify(value));
      },
    },
    weight:{
      type: DataTypes.STRING,
      allowNull: false,
      get(){
        return JSON.parse(this.getDataValue("weight"));
      },
      set(value){
        this.setDataValue("weight", JSON.stringify(value));
      },
    },
    life_span:{
      type: DataTypes.STRING,
      allowNull: false,
    }
    
  }, { timestamps: false });

}