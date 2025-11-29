// Google Analytics 4 Script Component
export function GoogleAnalytics({ measurementId }: { measurementId: string }) {
    return (
        <>
            <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
            />
            <script
                id="google-analytics"
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${measurementId}', {
                            page_path: window.location.pathname,
                            anonymize_ip: true,
                            cookie_flags: 'SameSite=None;Secure'
                        });
                    `,
                }}
            />
        </>
    );
}

// Microsoft Clarity Script
export function MicrosoftClarity({ projectId }: { projectId: string }) {
    return (
        <script
            id="microsoft-clarity"
            dangerouslySetInnerHTML={{
                __html: `
                    (function(c,l,a,r,i,t,y){
                        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                    })(window, document, "clarity", "script", "${projectId}");
                `,
            }}
        />
    );
}

// Google Tag Manager
export function GoogleTagManager({ gtmId }: { gtmId: string }) {
    return (
        <>
            <script
                id="gtm-script"
                dangerouslySetInnerHTML={{
                    __html: `
                        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','${gtmId}');
                    `,
                }}
            />
        </>
    );
}

// Facebook Pixel
export function FacebookPixel({ pixelId }: { pixelId: string }) {
    return (
        <script
            id="fb-pixel"
            dangerouslySetInnerHTML={{
                __html: `
                    !function(f,b,e,v,n,t,s)
                    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window, document,'script',
                    'https://connect.facebook.net/en_US/fbevents.js');
                    fbq('init', '${pixelId}');
                    fbq('track', 'PageView');
                `,
            }}
        />
    );
}

// Hotjar Analytics
export function Hotjar({ hjid, hjsv }: { hjid: string; hjsv: string }) {
    return (
        <script
            id="hotjar"
            dangerouslySetInnerHTML={{
                __html: `
                    (function(h,o,t,j,a,r){
                        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                        h._hjSettings={hjid:${hjid},hjsv:${hjsv}};
                        a=o.getElementsByTagName('head')[0];
                        r=o.createElement('script');r.async=1;
                        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                        a.appendChild(r);
                    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
                `,
            }}
        />
    );
}

// Simple privacy-focused analytics (no cookies)
export function SimpleAnalytics() {
    return (
        <script
            async
            defer
            src="https://scripts.simpleanalyticscdn.com/latest.js"
        />
    );
}
