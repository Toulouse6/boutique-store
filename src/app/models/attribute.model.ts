class AttributeModel {

    id: string;
    title: string;
    type: "COLOR" | "TEXT";
    labels: { label_id: string; title: string; data?: string }[];

    constructor(data: any) {
        this.id = data.id;
        this.title = data.title;
        this.type = data.type;
        this.labels = (data.labels || []).map((label: any) => ({
            label_id: label.id,
            title: label.title,
            data: label.data
        }));
    }
}

export default AttributeModel;
