import axios from 'axios';

export default class {
    constructor(opts) {
        this.storage = {};
        this.state = { selected: null };
        this.settings = Object.assign({}, opts);
    }

    fetch(url) {
        if (url === undefined) {
            return;
        }

        return axios.get(url);
    }

    async data(opts) {
        const { url } = opts;

        if (url === undefined) {
            return;
        }

        if (this.storage[url] === undefined) {
            this.storage[url] = await this.fetch(url);
        }
        
        return this.storage[url];
    }

    async fetchRegions(cb) {
        const url = this.settings.regionsUrl;

        if (url === undefined) {
            throw 'Error: undefined url';
        }

        let { data } = await this.data({ url });

        if (data === undefined) {
            return;
        }

        data = data.filter(item => item.title !== undefined);

        return data;
    }

    async fetchLocalities(id) {
        const url = this.settings.localitiesUrl;

        if (url === undefined) {
            throw 'Error: undefined url';
        }

        const { data } = await this.data({ url });

        if (data === undefined) {
            throw 'Error';
        }

        const [ { list } ] = data.filter(item => item.id === id);

        return list;
    }

    get formData() {
        return { url: this.settings.saveUrl, ...this.state.selected}
    }
};
