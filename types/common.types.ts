export interface IScan {
    errors: Array<string>,
    adobe: any
};

export interface IActivity {
    id: number;
    thirdPartyId: string;
    type: string;
    state: string;
    name: string;
    priority: number;
    workspace: string;
    modifiedAt: string;
};

export type experience_targetApi = Array<{
    "experienceLocalId": number,
    "name"?: string,
    "audienceIds": [],
    "visitorPercentage": number,
    "optionLocations": Array<{
        "locationLocalId": number,
        "optionLocalId": number
    }> | [];
}>

export interface IModifiedActivity extends Partial<IActivity> {
    affectedURL: string;
    experiences: Array<{
        name: string;
        code: string;
    }>
}

export interface ITargetApi_getLive {
    total: number,
    offset: number,
    limit: number,
    activities: Array<IActivity>
}

export interface ITargetApi_getLive_client {
    data: Array<ITargetApi_getLive>;
}

export interface IActivityByID {
    "id": number;
    "thirdPartyId": string;
    "name": string;
    "state": string,
    "priority": number,
    "options": Array<{
        "optionLocalId": number,
        "name": string,
        "offerId": number,
        "offerTemplates": Array<{
            "offerTemplateId": number,
            "templateParameters": Array<{
                "name": string,
                "value": string,
            }> | [],
        }>
    }>,
    "locations": {
        "mboxes": Array<any>,
        "selectors": Array<
            {
                "locationLocalId": number,
                "name": string,
                "selector": string,
                "audienceIds": [number]
            }
        >
    },
    "experiences": experience_targetApi;
    "metrics": [
        {
            "metricLocalId": 32767,
            "name": "MY PRIMARY GOAL",
            "conversion": true,
            "action": {
                "type": "count_once"
            },
            "mboxes": [],
            "clickTrackSelectors": [
                {
                    "selector": "#persText-487 > H1.sm-font-size--28:eq(0)",
                    "audienceIds": [
                        6665037
                    ],
                    "viewLocalId": 2
                }
            ]
        }
    ],
    "reportingAudiences": [],
    "workspace": "12082912",
    "modifiedAt": "2023-04-11T14:23:36Z",
    "views": [
        {
            "viewLocalId": 2,
            "viewId": 97,
            "audienceIds": []
        }
    ],
    "applicationContext": {
        "channel": "web",
        "applicationVersions": [],
        "mobilePlatformVersions": []
    }
}