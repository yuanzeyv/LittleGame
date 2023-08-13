import {_decorator, Component, Node, Sprite, find} from 'cc';

const {ccclass, property} = _decorator;

export class CardCellEffect extends Component {
    @property({type: Boolean, displayName: "是否可点击"})
    private m_Selectable: boolean;

    private m_Selected: boolean;//是否已经选中
    private m_BorderSprite: Node; //边框效果精灵

    get Selectable(): boolean {
        return this.m_Selectable;
    }

    set Selectable(value: boolean) {
        this.m_Selectable = value;
    }
    get Selected(): boolean {
        return this.m_Selected;
    }

    set Selected(value: boolean) {
        this.m_Selected = value;
    }

    onLoad() {
        const _this = this
        this.m_BorderSprite = find("SpriteBorder", this.node);
        this.m_Selected = false;//this.m_BorderSprite.active
        this.m_BorderSprite.active = this.m_Selected;
        this.node.on(Node.EventType.TOUCH_END, function () {
            _this.onClick();
        }, this);
    }

    onClick() {
        if (this.m_Selectable) {
            this.m_Selected = !this.m_Selected
            this.m_BorderSprite.active = this.m_Selected;
        }
    }
}

