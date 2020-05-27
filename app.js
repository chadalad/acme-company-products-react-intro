const app = document.querySelector('#app');

const productPromise = axios.get('https://acme-users-api-rev.herokuapp.com/api/products');
const companyPromise = axios.get('https://acme-users-api-rev.herokuapp.com/api/companies');

const { Component } = React;
const e = React.createElement;

class Header extends Component {
    render() {
        const mad = this;
        const {companies, products} = mad.props;
        return e('h1', null, `Acme - We have ${products.length} Products and ${companies.length} Companies`);
    }
}

class Products extends Component {
    render() {
        const mad = this;
        const {products} = mad.props;
        const productsArr = products.map((product, idx) => {
            return e('li', {key: idx}, product.name);
        });
        return e('ul', {key: products}, productsArr);
    }
}

class Companies extends Component {
    render() {
        const mad = this;
        const {companies} = mad.props;
        const companiesArr = companies.map((company, idx) => {
            return e('li', {key: idx}, company.name);
        });
        return e('ul', {key: companies}, companiesArr);
    }
}

class App extends Component {
    state = {
        products: [],
        companies: [],
    };

    componentDidMount() {
        Promise.all([productPromise, companyPromise])
        .then((response) => {
            this.setState({
                products: response[0].data,
                companies: response[1].data,
            });
        })
    };

    render() {
        const {products, companies} = this.state;
        return e('div', {className: 'content'},
            e(Header, {products, companies}),
            e('span', null, 
                e(Products, {products}),
            ),
            e('span', null,
                e(Companies, {companies}),
            )
            
        );
    };
}

ReactDOM.render(React.createElement(App), app, ()=>{console.log('I have rendered!')});