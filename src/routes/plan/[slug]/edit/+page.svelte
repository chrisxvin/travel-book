<script lang="ts" module>
import "./styles.less";

</script>

<script lang="ts">
import type { Component } from "svelte";
import type { IItineraryItem, TimelineItem } from "$lib/types";
import type { PageData } from "./$types";

import { pascalCase } from "change-case";
import { enhance } from "$app/forms";
import { goto } from "$app/navigation";
import { page } from "$app/stores";
import { PlaceEditor, TransportIcon, WhenAndWhere } from "$lib/components";
import { TimelineEntryKind, TransportType } from "$lib/types";
import { config, evt, TransportIconMap } from "$lib/utils";

let {
    data,
}: {
    data: PageData;
} = $props();
export const plan = $state(data.plan);

const jsonData = $derived(JSON.stringify(plan));

const timelineKinds: {
    type: TimelineEntryKind;
    caption: string;
}[] = [
    {
        type: TimelineEntryKind.Place,
        caption: pascalCase(TimelineEntryKind.Place),
    },
    {
        type: TimelineEntryKind.Transport,
        caption: pascalCase(TimelineEntryKind.Transport),
    },
    {
        type: TimelineEntryKind.Activity,
        caption: pascalCase(TimelineEntryKind.Activity),
    },
];

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
    const newItemChooser: TimelineItem = {
        kind: TimelineEntryKind.Unknown,
    };

    plan.itinerary[itineraryIndex].timeline.splice(timelineIndex + 1, 0, newItemChooser);
}

function doCancelAddTimeline(itineraryIndex: number, timelineIndex: number) {
    plan.itinerary[itineraryIndex].timeline.splice(timelineIndex, 1);
}

function doAddItemDone(itineraryIndex: number, timelineIndex: number, kind: TimelineEntryKind) {
    /*const newItem = */ plan.itinerary[itineraryIndex].timeline[timelineIndex] = {
        kind,
        // prettier-ignore
        ...(
            // kind === TimelineEntryKind.Unknown ? {} :
            kind === TimelineEntryKind.Place ? { city: "A new place", } :
            kind === TimelineEntryKind.Transport ? { travelBy: TransportType.Train, currency: "GBP", } :
            kind === TimelineEntryKind.Activity ? { activity: "What do you like to do?", } : 
            {}
        ) as any,
    };

    // editingItem.edit(index, newItem, timeline);
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
        <button class="btn btn-primary join-item" onclick={evt(btnGoBack_Click).preventDefault}>Back</button>
        <button class="btn btn-success join-item">Save</button>
        <button class="btn join-item" onclick={evt(btnRevert_Click).preventDefault}>Revert</button>
        <button class="btn join-item" onclick={evt(btnTest_Click).preventDefault}>Test</button>
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
            <ul class="plan-editor collapse-content">
                {#each itinerary.timeline as timelineItem, timelineIndex}
                    <li class="plan-editor-item">
                        <span class="plan-editor-item-handle mdi mdi-drag-vertical justify-self-start text-3xl"></span>

                        {#if timelineItem.kind === TimelineEntryKind.Unknown}
                            <!-- 添加新的时间线条目 -->

                            <div class="plan-editor-layout my-2 flex flex-row gap-2">
                                <div class="join">
                                    {#each timelineKinds as item}
                                        <button class="btn btn-outline btn-primary join-item" onclick={() => doAddItemDone(dayIndex, timelineIndex, item.type)}>{item.caption}</button>
                                    {/each}
                                </div>

                                <button class="btn btn-ghost" onclick={() => doCancelAddTimeline(dayIndex, timelineIndex)}>Cancel</button>
                            </div>
                        {:else}
                            <!-- 编辑时间线条目 -->

                            <div class="plan-editor-layout w-full">
                                {#if timelineItem.kind === TimelineEntryKind.Place}
                                    <!-- 地点 -->

                                    <!-- 图标 -->
                                    <div class="mb-2">
                                        <span class="mdi mdi-map-marker text-2xl text-info"></span>
                                        <span class="text-lg">City</span>
                                    </div>

                                    <div class="grid w-full grid-cols-2 gap-2 bg-base-100">
                                        <!-- <GoogleMapsPlacesAutocomplete apiKey={GOOGLE_API_KEY} styleClass="input input-bordered join-item" onplaceChanged={gma_PlaceChanged} value={editingItem.city} language="zh" /> -->
                                        <!--
                                    <label class="input input-bordered flex items-center gap-2">
                                        <span class="mdi mdi-city join-item"></span>
                                        <input type="text" class="grow" placeholder="City" bind:value={timelineItem.city} />
                                    </label>
                                    -->
                                        <PlaceEditor placeholder="City" bind:value={timelineItem.city} />

                                        <label class="input input-bordered flex items-center gap-2">
                                            <span class="mdi mdi-map-marker"></span>
                                            <input type="text" class="grow" placeholder="Place" bind:value={timelineItem.place} />
                                        </label>
                                    </div>
                                {:else if timelineItem.kind === TimelineEntryKind.Transport}
                                    <!-- 交通 -->

                                    <!-- 图标 -->
                                    <div class="mb-2">
                                        <TransportIcon className="text-info text-2xl" type={timelineItem.travelBy} />
                                        <span class="text-lg">Transport</span>
                                    </div>

                                    <div class="grid grid-cols-[repeat(2,min-content_1fr)] gap-2 items-center">
                                        <span class="grow">Depart:&nbsp;</span>
                                        <WhenAndWhere bind:when={timelineItem.departAt} bind:where={timelineItem.departFrom} />

                                        <span class="grow">Arrive:&nbsp;</span>
                                        <WhenAndWhere bind:when={timelineItem.arriveAt} bind:where={timelineItem.arriveTo} />

                                        <span class="grow">Travel&nbsp;By:&nbsp;</span>
                                        <div class="join">
                                            <select class="join-item w-28 select select-bordered" bind:value={timelineItem.travelBy}>
                                                {#each transTypes as type}
                                                    <option value={type}>{type}</option>
                                                {/each}
                                            </select>
                                            <input type="text" class="input join-item input-bordered grow" placeholder="Service Id" bind:value={timelineItem.serviceId} />
                                        </div>

                                        <span class="grow">Price:&nbsp;</span>
                                        <div class="join">
                                            <select class="join-item w-28 select select-bordered" bind:value={timelineItem.currency}>
                                                {#each config.currencies as c}
                                                    <option>{c}</option>
                                                {/each}
                                            </select>
                                            <input type="number" class="input join-item input-bordered grow" placeholder="Price" bind:value={timelineItem.price} />
                                        </div>
                                    </div>
                                {:else if timelineItem.kind === TimelineEntryKind.Activity}
                                    <!-- 活动 -->

                                    <!-- 图标 -->
                                    <div class="mb-2">
                                        <span class="mdi mdi-check-circle text-2xl text-info"></span>
                                        <span class="text-lg">Activity</span>
                                    </div>

                                    <textarea class="textarea textarea-bordered w-full bg-base-100" placeholder="Activity" bind:value={timelineItem.activity}></textarea>
                                {/if}
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
                        {/if}

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
