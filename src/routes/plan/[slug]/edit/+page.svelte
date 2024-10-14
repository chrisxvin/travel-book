<script lang="ts">
import type { Component } from "svelte";
import type { IItineraryItem, TimelineItem } from "$lib/types";
import type { PageData } from "./$types";

import { pascalCase } from "change-case";
import { enhance } from "$app/forms";
import { goto } from "$app/navigation";
import { page } from "$app/stores";
import { TransportIcon } from "$lib/components";
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
    /*const newItem = */plan.itinerary[itineraryIndex].timeline[timelineIndex] = {
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

</script>

<!-- edit toolbar -->
<!-- 使用 use:enhance 实现表单提交后不刷新页面，用户体验更佳。 -->
<form method="POST" action="?/save" use:enhance>
    <section class="join">
        <button class="btn btn-primary join-item" onclick={evt(btnGoBack_Click).preventDefault}>Back</button>
        <button class="btn btn-success join-item">Save</button>
        <button class="btn join-item" onclick={evt(btnRevert_Click).preventDefault}>Revert</button>
        <button class="btn join-item" onclick={evt(btnTest_Click).preventDefault}>Test</button>
    </section>
    <!-- 页面数据是一个 JSON 对象，而 form 提交的是 FormData，用这个隐藏输入来转换。 -->
    <input type="hidden" name="plan" value={jsonData} />
</form>
<br />

<section class="plan">
    <div class="flex flex-row justify-between">
        <label class="input input-bordered flex items-center gap-2">
            <span class="mdi mdi-pencil"></span>
            <input type="text" class="grow" placeholder="Plan Title" bind:value={plan.title} />
        </label>

        <!-- <p>{showDate(plan.from)} --&gt; {showDate(plan.to)}</p> -->
        <span>&nbsp;</span>
    </div>

    {#each plan.itinerary as itinerary, dayIndex}
        <h2><span class="mdi mdi-calendar-today">&nbsp;{itinerary.date}</span></h2>
        <ul class="plan-editor">
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
                                <div class="">
                                    <span class="mdi mdi-map-marker text-2xl text-info"></span>
                                    <span class="text-lg">City</span>
                                </div>

                                <div class="grid w-full grid-cols-2 gap-2 bg-base-100">
                                    <!-- <GoogleMapsPlacesAutocomplete apiKey={GOOGLE_API_KEY} styleClass="input input-bordered join-item" onplaceChanged={gma_PlaceChanged} value={editingItem.city} language="zh" /> -->
                                    <label class="input input-bordered flex items-center gap-2">
                                        <span class="mdi mdi-city join-item"></span>
                                        <input type="text" class="grow" placeholder="City" bind:value={timelineItem.city} />
                                    </label>

                                    <label class="input input-bordered flex items-center gap-2">
                                        <span class="mdi mdi-map-marker"></span>
                                        <input type="text" class="grow" placeholder="Place" bind:value={timelineItem.place} />
                                    </label>
                                </div>
                            {:else if timelineItem.kind === TimelineEntryKind.Transport}
                                <!-- 交通 -->

                                <!-- 图标 -->
                                <div>
                                    <TransportIcon className="text-info text-2xl" type={timelineItem.travelBy} />
                                    <span class="text-lg">Transport</span>
                                </div>
                                
                                <div class="grid grid-cols-2 gap-2">
                                    <div>
                                        <h4>Depart:</h4>
                                        <div class="join w-full">
                                            <label class="input join-item input-bordered flex items-center gap-2">
                                                <input type="time" class="w-full" placeholder="At" bind:value={timelineItem.departAt} />
                                            </label>
                                            <label class="input join-item input-bordered flex w-full items-center gap-2">
                                                <span class="mdi mdi-map-marker"></span>
                                                <input type="text" class="w-full" placeholder="From" bind:value={timelineItem.departFrom} />
                                            </label>
                                        </div>
                                    </div>
                                
                                    <div>
                                        <h4>Arrive:</h4>
                                        <div class="join w-full">
                                            <label class="input join-item input-bordered flex items-center gap-2">
                                                <input type="time" class="w-full" placeholder="At" bind:value={timelineItem.arriveAt} />
                                            </label>
                                            <label class="input join-item input-bordered flex w-full items-center gap-2">
                                                <span class="mdi mdi-map-marker"></span>
                                                <input type="text" class="w-full" placeholder="To" bind:value={timelineItem.arriveTo} />
                                            </label>
                                        </div>
                                    </div>
                                
                                    <div>
                                        <h4>Travel By:</h4>
                                        <div class="join w-full">
                                            <select class="join-item select select-bordered max-w-xs" bind:value={timelineItem.travelBy}>
                                                {#each transTypes as type}
                                                    <option value={type}>{type}</option>
                                                {/each}
                                            </select>
                                            <input type="text" class="input join-item input-bordered w-full" placeholder="Service Id" bind:value={timelineItem.serviceId} />
                                        </div>
                                    </div>
                                
                                    <div>
                                        <h4>Price:</h4>
                                        <div class="join w-full">
                                            <select class="join-item select select-bordered w-1/3" bind:value={timelineItem.currency}>
                                                {#each config.currencies as c}
                                                    <option>{c}</option>
                                                {/each}
                                            </select>
                                            <input type="number" class="input join-item input-bordered w-2/3" placeholder="Price" bind:value={timelineItem.price} />
                                        </div>
                                    </div>
                                </div>
                            
                            {:else if timelineItem.kind === TimelineEntryKind.Activity}
                                <!-- 活动 -->

                                <!-- 图标 -->
                                <div class="">
                                    <span class="mdi mdi-check-circle text-2xl text-info"></span>
                                    <span class="text-lg">Activity</span>
                                </div>

                                <textarea class="textarea textarea-bordered w-full bg-base-100" placeholder="Activity" bind:value={timelineItem.activity}></textarea>
                            {/if}
                        </div>

                        <!-- TODO: 这几个按钮，能否做到列表之外，根据 hover 的 item 来显示 -->
                        <div class="edit-btn-fix">
                            <div class="join">
                                <button class="btn btn-error join-item btn-xs" onclick={() => doDeleteTimeline(dayIndex, timelineIndex)}>
                                    <span class="mdi mdi-delete-alert"></span>
                                </button>
                            </div>
                        </div>
                    {/if}

                    <button class="add-btn-fix btn btn-circle text-3xl" onclick={() => doAddNewTimeline(dayIndex, timelineIndex)}>
                        <span class="mdi mdi-plus"></span>
                    </button>
                </li>
            {/each}
        </ul>
    {/each}
</section>
