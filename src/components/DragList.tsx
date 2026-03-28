import {
    DndContext,
    closestCenter,
    type DragEndEvent
} from "@dnd-kit/core";

import {
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
    arrayMove
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

interface ItemType {
    id: string;
    name: string;
}

interface Props {
    items: ItemType[];
    onChange: (items: ItemType[]) => void;
}

function Item({ id, name }: ItemType) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="p-4 bg-[#0b1220] border border-gray-700 rounded-xl mb-3 cursor-move"
        >
            {name}
        </div>
    );
}

export default function DragList({ items, onChange }: Props) {

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        const oldIndex = items.findIndex(i => i.id === active.id);
        const newIndex = items.findIndex(i => i.id === over.id);

        const newItems = arrayMove(items, oldIndex, newIndex);

        onChange(newItems); // 🔥 update parent state
    };

    return (
        <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={items.map(i => i.id)}
                strategy={verticalListSortingStrategy}
            >
                {items.map((item) => (
                    <Item key={item.id} id={item.id} name={item.name} />
                ))}
            </SortableContext>
        </DndContext>
    );
}