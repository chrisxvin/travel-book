<script lang="ts" module>
import "./styles.less";
</script>

<script lang="ts">
import type { TimelineItem } from "$lib/types";
import type { PageData } from "./$types";

import { enhance } from "$app/forms";
import { goto } from "$app/navigation";
import { page } from "$app/stores";
import { PlaceEditor, TransportIcon, WhenAndWhere } from "$lib/components";
import { TransportType } from "$lib/types";
import { config, handler, TransportIconMap } from "$lib/utils";

let {
    data,
}: {
    data: PageData;
} = $props();
export const plan = $state(data.plan);

const jsonData = $derived(JSON.stringify(plan));
const transTypes = Object.keys(TransportIconMap) as TransportType[];

/*
let tabIndex = $state(0);
*/

function btnGoBack_Click(event: MouseEvent) {
    const currentPath = $page.url.pathname;
    // 获取父级路径，移除最后一级路径
    const parentPath = currentPath.substring(0, currentPath.lastIndexOf("/"));
    goto(parentPath);
}

function btnRevert_Click(event: MouseEvent) {
    if (confirm("Discard all editings?")) {
        window.location.reload();
    }
}

function btnTest_Click(event: MouseEvent) {
    log($state.snapshot(plan.itinerary[0].timeline));
}

function doAddNewTimeline(itineraryIndex: number, timelineIndex: number) {
    const newItem: TimelineItem = {
        // kind: TimelineEntryKind.Unknown,
        city: "A new place to stay",
        travelBy: TransportType.Walk,
    };

    plan.itinerary[itineraryIndex].timeline.splice(timelineIndex + 1, 0, newItem);
}

function doCancelAddTimeline(itineraryIndex: number, timelineIndex: number) {
    plan.itinerary[itineraryIndex].timeline.splice(timelineIndex, 1);
}

function doDeleteTimeline(itineraryIndex: number, timelineIndex: number) {
    if (confirm("Sure?")) {
        plan.itinerary[itineraryIndex].timeline.splice(timelineIndex, 1);
    }
}

function editTitle(e: MouseEvent) {
    const btn = e.target as HTMLButtonElement;
    const editor = btn.parentElement?.getElementsByTagName("input").namedItem("date-edit");
    const controller = btn.parentElement?.parentElement?.parentElement?.getElementsByTagName("input").namedItem("day-accordion");
    if (!controller || !editor) return;

    if (controller.style.display !== "none") {
        controller.style.display = "none";
        editor.focus();
        btn.innerText = "Save";
    } else {
        controller.style.display = "block";
        controller.focus();
        btn.innerText = "Edit";
    }
}
</script>

<!-- edit toolbar -->
<!-- 使用 use:enhance 实现表单提交后不刷新页面，用户体验更佳。 -->
<form method="POST" action="?/save" class="sticky top-0 z-10 border-b-2 bg-slate-50/90 p-2 backdrop-blur-sm" use:enhance>
    <section class="join">
        <button class="btn btn-primary join-item" onclick={handler(btnGoBack_Click).preventDefault}>Back</button>
        <button class="btn btn-success join-item">Save</button>
        <button class="btn join-item" onclick={handler(btnRevert_Click).preventDefault}>Revert</button>
        <button class="btn join-item" onclick={handler(btnTest_Click).preventDefault}>Test</button>
    </section>
    <!-- 页面数据是一个 JSON 对象，而 form 提交的是 FormData，用这个隐藏输入来转换。 -->
    <input type="hidden" name="plan" value={jsonData} />
</form>

<section class="plan">
    <!-- 计划标题 -->
    <label class="input input-bordered mx-2 flex items-center gap-2">
        <span class="mdi mdi-pencil"></span>
        <input type="text" class="grow" placeholder="Plan Title" bind:value={plan.title} />
    </label>

    {#each plan.itinerary as itinerary, dayIndex}
        <div class="collapse">
            <input type="radio" name="day-accordion" checked={dayIndex == 0} />

            <div class="collapse-title">
                <hr class="my-2" />
                <!-- 日期 -->
                <label class="input mx-2 flex items-center gap-2">
                    <span class="mdi mdi-calendar-today"></span>
                    <input type="text" name="date-edit" class="grow" placeholder="Date" bind:value={itinerary.date} />
                    <button class="btn z-[5]" onclick={editTitle}>Edit</button>
                </label>
            </div>

            <!-- plan-editor ==> timeline-editor -->
            <ul class="plan-editor collapse-content p-0 xl:p-4">
                {#each itinerary.timeline as timelineItem, timelineIndex}
                    <li class="plan-editor-item">
                        <span class="plan-editor-item-handle mdi mdi-drag-vertical justify-self-start text-3xl"></span>

                       
                            <!-- 编辑时间线条目 -->

                            <div class="plan-editor-layout w-full">
                                    <!-- 地点 -->

                                    <!-- 图标 -->
                                    <div class="mb-2">
                                        <span class="mdi mdi-map-marker text-2xl text-info"></span>
                                        <span class="text-lg">City</span>
                                    </div>

                                    <div class="grid w-full grid-cols-2 gap-2 bg-base-100">
                                        <PlaceEditor placeholder="City" bind:value={timelineItem.city} />
                                        <input class="input input-bordered w-full bg-base-100" placeholder="Comment" bind:value={timelineItem.comment} />

                                        <!--
                                        <label class="input input-bordered flex items-center gap-2">
                                            <span class="mdi mdi-map-marker"></span>
                                            <input type="text" class="grow" placeholder="Place" bind:value={timelineItem.place} />
                                        </label>
                                        -->
                                    </div>
                                    <!-- 交通 -->

                                    <!-- 图标 -->
                                    <div class="mb-2">
                                        <TransportIcon className="text-info text-2xl" type={timelineItem.travelBy} />
                                        <span class="text-lg">Transport</span>
                                    </div>

                                    <div class="grid grid-cols-[min-content_1fr] lg:grid-cols-[repeat(2,min-content_1fr)] xl:grid-cols-[repeat(3,min-content_1fr)] items-center gap-2">
                                        <span class="grow">Depart:&nbsp;</span>
                                        <WhenAndWhere bind:when={timelineItem.departAt} bind:where={timelineItem.departFrom} />

                                        <span class="grow">Arrive:&nbsp;</span>
                                        <WhenAndWhere bind:when={timelineItem.arriveAt} bind:where={timelineItem.arriveTo} />

                                        <span class="grow">Travel&nbsp;By:&nbsp;</span>
                                        <div class="join">
                                            <select class="join-item select select-bordered w-28" bind:value={timelineItem.travelBy}>
                                                {#each transTypes as type}
                                                    <option value={type}>{type}</option>
                                                {/each}
                                            </select>
                                            <input type="text" class="input join-item input-bordered grow" placeholder="Service Id" bind:value={timelineItem.serviceId} />
                                        </div>

                                        <span class="grow">Price:&nbsp;</span>
                                        <div class="join">
                                            <select class="join-item select select-bordered w-28" bind:value={timelineItem.currency}>
                                                {#each config.currencies as c}
                                                    <option>{c}</option>
                                                {/each}
                                            </select>
                                            <input type="number" class="input join-item input-bordered grow" placeholder="Price" bind:value={timelineItem.price} />
                                        </div>

                                        <textarea class="textarea textarea-bordered col-span-2 row-span-2 lg:col-span-4 xl:col-start-5 xl:row-start-1 w-full bg-base-100" placeholder="Comment" bind:value={timelineItem.comment}></textarea>
                                    </div>
                                
                            </div>

                            <!-- TODO: 这几个按钮，能否做到列表之外，根据 hover 的 item 来显示 -->
                            <!-- 删除按钮 -->
                            <div class="edit-btn-fix">
                                <div class="join">
                                    <button class="btn btn-error join-item btn-xs" tabindex="-1" onclick={() => doDeleteTimeline(dayIndex, timelineIndex)}>
                                        <span class="mdi mdi-delete-alert"></span>
                                    </button>
                                </div>
                            </div>

                        <!-- 添加新条目 -->
                        <button class="add-btn-fix btn btn-circle text-3xl" tabindex="-1" onclick={() => doAddNewTimeline(dayIndex, timelineIndex)}>
                            <span class="mdi mdi-plus"></span>
                        </button>
                    </li>
                {/each}
            </ul>
        </div>
    {/each}
</section>
