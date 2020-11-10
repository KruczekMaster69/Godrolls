new Vue({
    el: '#App',
    data: {
        selectedType: 'weapons',
        types: ['weapons', 'traps'],
        items: [],
        imageViewer: null,
    },
    computed: {
        filteredItems () {
            return this.items.filter((item) => {
                return item.type === this.selectedType;
            });
        },
        necessaryMaterials () {
            const materials = {};
            this.items.forEach((item) => {
                if (typeof item.materials !== 'object') return;
                if (item.quantity <= 0) return;
                Object.keys(item.materials).forEach((materialName) => {
                    if (typeof materials[materialName] === 'undefined') {
                        materials[materialName] = item.quantity * item.materials[materialName];
                        return;
                    }
                    materials[materialName] += item.quantity * item.materials[materialName];
                });
            });
            return materials;
        },
    },
    methods: {
        selectType (type) {
            this.selectedType = type;
        },
        async fetchItems () {
            const { data } = await axios.get('./items.json');
            this.items = data.map((item) => {
                item.quantity = 0;
                return item;
            });
        },
        viewImage (src) {
            this.imageViewer = src;
        },
        addItem (item) {
            ++this.items[this.items.indexOf(item)].quantity;
        },
        subtractItem (item) {
            const selectedItem = this.items[this.items.indexOf(item)];
            if (selectedItem.quantity <= 0) return;
            --selectedItem.quantity;
        },
    },
    async created () {
        await this.fetchItems();
    },
});