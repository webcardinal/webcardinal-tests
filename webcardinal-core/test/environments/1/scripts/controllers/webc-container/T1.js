const { Controller } = WebCardinal.controllers;

export default class extends Controller {
    constructor(element, history) {
        super(element, history);
        this.setModel({
          title: 'Title!',
          description: 'This is our Description!',
          class: 'surprise',
          dataViewModel: {
            text: 'Text',
            class: {
              inactive: false,
              success: true
            },
            custom: 'custom-attribute',
            tag: 'div-tag'
          }
        });
    }
}
