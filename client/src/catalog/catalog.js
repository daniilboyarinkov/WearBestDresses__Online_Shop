const EveningDresses = require('./dresses/configs/new-EveningDresses.json')
const DenimDresses = require('./dresses/configs/new-DenimDresses.json')
const LeatherDresses = require('./dresses/configs/new-LeatherDresses.json')
const OffScheduledDresses = require('./dresses/configs/new-OffShoulderDress.json')
const TankDresses = require('./dresses/configs/new-TankDressses.json')
const JacketDresses = require('./dresses/configs/new-JacketDresses.json')
const ShirtDresses = require('./dresses/configs/new-ShirtDresses.json')
const SweaterDresses = require('./dresses/configs/new-SweaterDresses.json')
const TShirtDresses = require('./dresses/configs/new-TShirtDresses.json')
const SheathDresses = require('./dresses/configs/new-SheathDresses.json')
const EverydayDresses = require('./dresses/configs/new-EverydayDresses.json')

const catalog = {
    'all': [
        ...EveningDresses,
        ...DenimDresses,
        ...EverydayDresses,
        ...JacketDresses,
        ...LeatherDresses,
        ...OffScheduledDresses,
        ...SheathDresses,
        ...ShirtDresses,
        ...SweaterDresses,
        ...TShirtDresses,
        ...TankDresses,
    ],
    'evening-dresses': EveningDresses,
    'denim-dresses': DenimDresses,
    'leather-dresses': LeatherDresses,
    'off-scheduled-dresses': OffScheduledDresses,
    'tank-dresses': TankDresses,
    'jacket-dresses': JacketDresses,
    'shirt-dresses': ShirtDresses,
    'sweater-dresses': SweaterDresses,
    'tshirt-dresses': TShirtDresses,
    'sheath-dresses': SheathDresses,
    'everyday-dresses': EverydayDresses,
}

console.log(catalog)

export default catalog
