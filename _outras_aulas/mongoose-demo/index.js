const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/tramasoli-mongoose-demo';

mongoose.connect(url, { useNewUrlParser: true }, async (err) => {
    if (err) {
        console.log('Blerg');
    }
    const countrySchema = mongoose.Schema(
        {
            name: { type: String, required: true },
            code: { type: String, required: true },
            language: { type: String, required: true, default: '-' }
        }
        // { versionKey: '_2' }
    );

    const Country = mongoose.model('Country', countrySchema);

    // const france = new Country({
    //     name: "Canadá",
    //     code: "CA"
    // });
    // const resultSave = await france.save().catch((err) => {
    //     console.log(err);
    // });

    // const results = await Country.find();
    // console.log(results);

    // const result = await Country.findOne({code: 'BR'});
    // result.name = 'Brasil';
    // result.code = 'BR';
    // const pais = await result.save().catch((err) => {
    //     console.log(err);
    // });
    // console.log(pais);

    const breakfastSchema = mongoose.Schema({
        eggs: {
            type: Number, min: [6, 'Too few eggs'], max: 12
        },
            bacon: {
            type: Number, required: [true, 'Why no bacon?']
        },
        drink: {
            type: String, enum: ['Coffee', 'Tea'],
            required: function() { return this.bacon > 3; }
        }
    });

    const Breakfast = mongoose.model('Breakfast', breakfastSchema);
    const bf = new Breakfast({ eggs: 6, bacon: 4, drink: 'Coffee' })
    try {
        await bf.save()
    } catch (err) {
        console.log(err)
    }
    console.log(bf)
});