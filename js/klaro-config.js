function initPostHog_California() {
    const isGPCEnabled = (navigator.globalPrivacyControl === true);

    !function (t, e) { var o, n, p, r; e.__SV || (window.posthog = e, e._i = [], e.init = function (i, s, a) { function g(t, e) { var o = e.split("."); 2 == o.length && (t = t[o[0]], e = o[1]), t[e] = function () { t.push([e].concat(Array.prototype.slice.call(arguments, 0))) } } (p = t.createElement("script")).type = "text/javascript", p.crossOrigin = "anonymous", p.async = !0, p.src = s.api_host.replace(".i.posthog.com", "-assets.i.posthog.com") + "/static/array.js", (r = t.getElementsByTagName("script")[0]).parentNode.insertBefore(p, r); var u = e; for (void 0 !== a ? u = e[a] = [] : a = "posthog", u.people = u.people || [], u.toString = function (t) { var e = "posthog"; return "posthog" !== a && (e += "." + a), t || (e += " (stub)"), e }, u.people.toString = function () { return u.toString(1) + ".people (stub)" }, o = "init Re Ms Fs Pe Rs Cs capture Ve calculateEventProperties Ds register register_once register_for_session unregister unregister_for_session zs getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey canRenderSurveyAsync identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty Ls As createPersonProfile Ns Is Us opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing is_capturing clear_opt_in_out_capturing Os debug I js getPageViewId captureTraceFeedback captureTraceMetric".split(" "), n = 0; n < o.length; n++)g(u, o[n]); e._i.push([i, s, a]) }, e.__SV = 1) }(document, window.posthog || []);

    posthog.init('phc_X3RBPEtoltUZgeok4tGE3IrU3lfpISjx9IHvia0RlGZ', {
        api_host: 'https://us.i.posthog.com',
        opt_out_capturing_by_default: isGPCEnabled,
        defaults: '2025-05-24',
        person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well,

        loaded: function (posthog) {
            insertCaliOptOutLink(posthog);
        }
    });

    console.log("PostHog loaded for CA");
}


function initPostHog_RestOfWorld() {
    !function (t, e) { var o, n, p, r; e.__SV || (window.posthog = e, e._i = [], e.init = function (i, s, a) { function g(t, e) { var o = e.split("."); 2 == o.length && (t = t[o[0]], e = o[1]), t[e] = function () { t.push([e].concat(Array.prototype.slice.call(arguments, 0))) } } (p = t.createElement("script")).type = "text/javascript", p.crossOrigin = "anonymous", p.async = !0, p.src = s.api_host.replace(".i.posthog.com", "-assets.i.posthog.com") + "/static/array.js", (r = t.getElementsByTagName("script")[0]).parentNode.insertBefore(p, r); var u = e; for (void 0 !== a ? u = e[a] = [] : a = "posthog", u.people = u.people || [], u.toString = function (t) { var e = "posthog"; return "posthog" !== a && (e += "." + a), t || (e += " (stub)"), e }, u.people.toString = function () { return u.toString(1) + ".people (stub)" }, o = "init Re Ms Fs Pe Rs Cs capture Ve calculateEventProperties Ds register register_once register_for_session unregister unregister_for_session zs getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey canRenderSurveyAsync identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty Ls As createPersonProfile Ns Is Us opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing is_capturing clear_opt_in_out_capturing Os debug I js getPageViewId captureTraceFeedback captureTraceMetric".split(" "), n = 0; n < o.length; n++)g(u, o[n]); e._i.push([i, s, a]) }, e.__SV = 1) }(document, window.posthog || []);
    posthog.init('phc_X3RBPEtoltUZgeok4tGE3IrU3lfpISjx9IHvia0RlGZ', {
        api_host: 'https://us.i.posthog.com',
        defaults: '2025-05-24',
        person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
    });
    console.log("PostHog loaded for ROW");
}

function ccpaOptOut() {
    // 1. Tell PostHog to stop capturing data for this user.
    if (window.posthog) {
        console.log("Turned off posthog capturing");
        window.posthog.opt_out_capturing();
    }

    // 2. Hide the link and show a confirmation message (tidy UX).
    const optOutElement = document.getElementById('ccpa-opt-out-link');
    if (optOutElement) {
        optOutElement.innerHTML = "Your opt-out preference has been saved.";
        optOutElement.style.fontWeight = 'bold';
    }
}

function insertCaliOptOutLink(posthog) {
    console.log("Inserting CA link");
    // If the user is already opted out, do NOT show the link!
    if (posthog && posthog.has_opted_out_capturing()) {
        const footer = document.querySelector('footer') || document.body;

        // Instead of the link, show a persistent confirmation message.
        const confirmation = document.createElement('span');
        confirmation.innerText = ' | Opt-Out Preference Saved';
        confirmation.style.fontWeight = 'bold';
        footer.appendChild(confirmation);
        return;
    } else {
        const linkContainer = document.createElement('span');
        linkContainer.id = 'ccpa-opt-out-link';
        linkContainer.style.fontSize = '0.9em'; // Keep it discreet but visible

        const link = document.createElement('a');
        link.href = 'javascript:void(0)'; // Prevent page reload

        // The mandatory text
        link.innerText = 'Do Not Sell or Share My Personal Information';

        // Crucial: The link calls the PostHog disabling function we defined above
        link.onclick = ccpaOptOut;

        linkContainer.appendChild(link);

        // Find the footer (or body) and append the link
        const footer = document.querySelector('footer') || document.body;

        // Add a separator for tidiness
        footer.appendChild(document.createTextNode(' | '));
        footer.appendChild(linkContainer);
    }
}

const klaroConfig = {
    version: 1,
    elementID: 'klaro',
    privacyPolicy: '/privacy',
    default: false,
    acceptAll: true,
    htmlTexts: true,
    services: [
        {
            name: 'posthog',
            purposes: ['user-experience-research'],
            cookies: ['ph_*'],

            callback: function (consent, service) {
                if (consent) {
                    initPostHog_RestOfWorld();
                } else {
                    if (window.posthog) {
                        window.posthog.opt_out_capturing();
                    }
                }
            }
        },
    ],
    translations: {
        en: {
            consentNotice: {
                description: 'The temple was built to make use of services necessary for {purposes}. Opting in allows me to access the data I need to refine and improve the content you see. But you have the legal right to decline or customize your consent below.'
            },
            // consentModal: {
            //     description: 'On this website, I use specific services to make things work as designed. The law gives you the right to disable any services below, but please be aware that core functionality, content quality, and site optimization may be negatively impacted. I respect your legal rights, but your decision affects the data I rely on to improve the site.'
            // },
            consentModal: {
                description: `<p>On this website, I use specific services to ensure the site <strong>functions and performs optimally</strong>. The law guarantees your right to disable any services below, but I must be clear: opting out will <strong>directly hinder my ability to refine the user experience</strong> and may result in broken functionality, stale content, or unresolved UI issues.</p>

                <p>Your choice is respected, but it is a direct trade-off with the quality of the site.</p>`,
            },
            privacyPolicy: {
                text: 'To understand how your data is processed, please consult the {privacyPolicy}.'
            },
            ok: 'Allow all',
            decline: 'Decline'
        }
    }

};

fetch('https://ipapi.co/json')
    .then(res => res.json())
    .then(data => {
        const country = data.country_code;
        const region = data.region_code;

        const euCountries = [
            'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE',
            'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT',
            'RO', 'SK', 'SI', 'ES', 'SE'
        ];

        if (euCountries.includes(country)) {
            console.log("Setting up Klaro for " + country);
            klaro.setup(klaroConfig);
        } else if (country === 'US' && region === 'CA') {
            console.log("Found California: " + region);
            initPostHog_California();
        } else {
            initPostHog_RestOfWorld();
        }
    })
    .catch(error => {
        // Failsafe: If the Geo-IP service fails, default to US mode (run PostHog) 
        // OR the safer EU mode (load Klaro). Running PostHog is easier.
        console.error('Geolocation failed, defaulting to direct load.', error);
        initPostHog_RestOfWorld();
    });
