import './style.less';
import CitySelectorModel from './model';

export default class {
    constructor(opts) {
        const { elementId, regionsUrl, localitiesUrl, saveUrl } = opts;

        this.settings = {
            containerClass: 'city-selector',
            itemClass: 'city-selector__item',
            subItemClass: 'city-selector__sub-item',
            localitiesListClass: 'localities-list',
            selectedClass: 'selected'
        };

        this.node = document.getElementById(elementId);
        this.selectedEl = {};

        this.model = new CitySelectorModel({ regionsUrl, localitiesUrl, saveUrl });

        this.node.classList.add(this.settings.containerClass);
        
        this.events();
    }

    events() {
        this.node.addEventListener('click', ev => this.onClick(ev));
    }

    onClick(ev) {
        const target = ev.target;
        const { dataset: { id, renderRegions, selectRegion, selectLocality } } = target;

        this.selectedEl.id = id;
        this.selectedEl.target = target;
        
        if (renderRegions !== undefined) {
            this.renderRegions();
        } else if (selectRegion !== undefined) {
            this.selectRegion(id);
        } else if (selectLocality !== undefined) {
            this.selectLocality();
        }
    }

    async renderRegions() {
        let html = '<ul>';

        const data = await this.model.fetchRegions();

        data.forEach(item => {
            const { id, title } = item;

            html += `<li class="${this.settings.itemClass}" 
                data-id="${id}"
                data-title="${title}" 
                data-select-region>${title}</li>`;
        });

        html += '</ul>';

        this.node.innerHTML = '';
        this.node.insertAdjacentHTML('beforeEnd', html);
    }

    async selectRegion(id) {
        const { target } = this.selectedEl;

        if (target !== undefined) {
            this.unselect(this.items);
            this.select(target);
        }

        const data = await this.model.fetchLocalities(id);

        this.renderLocalities(data, id);
        this.model.state.selected = { region: target.dataset.title };
    }

    async selectLocality(id) {
        const { target, localities } = this.selectedEl;

        if (target !== undefined) {
            this.unselect(this.subItems);
            this.select(target);
        }

        this.model.state.selected.city = target.dataset.title;
        this.renderSaveForm();
    }

    select(item) {
        if (item === undefined) {
            return;
        }

        item.classList.add(this.settings.selectedClass);
    }

    unselect(items) {
        if (items === undefined) {
            return;
        }
        
        items.forEach(item => item.classList.remove(this.settings.selectedClass));
    }

    renderLocalities(data, id) {
        if (this.localities !== null) {
            this.localities.remove();
        }

        if (this.form !== undefined) {
            this.form.remove();
        }

        let html = `<ul class='${this.settings.localitiesListClass}'>`;

        data.forEach(item => {
            html += `<li class="${this.settings.subItemClass}" 
                data-title="${item}" 
                data-select-locality>${item}</li>`;
        });

        html += '</ul>';

        this.node.insertAdjacentHTML('beforeEnd', html);
    }

    renderSaveForm() {
        if (this.form !== undefined) {
            this.form.remove();
        }

        const { url, region, city } = this.model.formData;

        this.node.insertAdjacentHTML('beforeEnd', `
            <form action="${url}" method="post" name="save">
                <input type="hidden" name="region" value="${region}" />
                <input type="hidden" name="city" value="${city}" />
                <button type="submit">Сохранить</button>
            </form>
        `);
    }

    get items() {
        return this.node.querySelectorAll(`.${this.settings.itemClass}`);
    }

    get subItems() {
        return this.node.querySelectorAll(`.${this.settings.subItemClass}`);
    }

    get localities() {
        return this.node.querySelector(`.${this.settings.localitiesListClass}`);
    }

    get form() {
        return document.forms.save;
    }
};
