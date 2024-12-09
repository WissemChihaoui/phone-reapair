import { _mock } from "./_mock";

export const _articlesList = [...Array(10)].map((_,index) => ({
    id: _mock.id(index),
    name: _mock.articles.name(index),
    coverUrl: 'https://i.pinimg.com/736x/d6/62/3f/d6623f4d67f053942fa96505b83f076b.jpg',
    refInterne: _mock.firstName(index),
    available: _mock.number.nativeS(index),
    quantity: _mock.number.nativeM(index),
    inventoryType: 'En Stock',
    price: _mock.number.price(index),
    buy_price: _mock.number.price(index)+20,
    fournisseur: 'fournisseur 2'
}))