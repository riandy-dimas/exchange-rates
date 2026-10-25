# Node 24 security upgrade

Upgrade CRA 3 to 5.0.1 and TypeScript 4.9 for Node 24, replace the Node 12 Docker image and remove the conflicting global react-scripts installation.

## Versions and compatibility

Validated on Node.js **24.22.1**; package engines remain **24.x**. The provider controls its patched 24.x rollout. Use the pinned package manager **yarn@1.22.22** and the committed yarn.lock.

- node: 24.22.1
- engines: 24.x
- packageManager: yarn@1.22.22
- react: 16.14.0
- react-dom: 16.14.0
- @types/node: 24.19.2
- react-scripts: 5.0.1

- A same-major Babel runtime resolution repairs Webpack 5's strict ESM extension error in legacy Material UI.
- CRA and old HTTP-client/tooling advisories remain visible.
- The retained Dockerfile is a development container, matching the existing compose configuration. CI builds it and checks startup without external networking. Six tests pass with mocked HTTP requests.

## Validation evidence

Baseline source: `fd0fd7d55558c3c199075d39cd8fc803f8f490ec`. Baseline manifests/lockfiles and audits were captured; full baseline production builds were run for the three Next 14 migrations, not all legacy/service repositories. Upgraded service builds use non-production environment values. No production database or image migration was run.

The table retains failed attempts as well as later repairs. Phase names distinguish placeholder-environment checks from checks that require no service configuration. The machine-readable [validation evidence](security-upgrade-validation.json) includes the lockfile digest and latest audit counts. A passing build alone does not imply authenticated workflows have been exercised.

| Check | Command | Result |
| --- | --- | --- |
| final-test | `yarn run test --runInBand --no-cache` | passed |
| final-build | `yarn run build` | exit 1 |
| patched-build | `yarn run build` | exit 1 |
| compatible-build | `yarn run build` | passed |
| isolated-tests | `yarn run test --runInBand --no-cache` | passed |
| axios-patched-build | `yarn run build` | passed |
| patched-tests | `yarn run test --runInBand --no-cache` | passed |
| patched-final-build | `yarn run build` | passed |

Browser smoke: **passed**. application shell renders with external requests blocked; desktop and mobile screenshots.

## Vulnerability comparison

- Baseline full dependency audit: 98 low, 419 moderate, 723 high, 112 critical.
- Current full dependency audit: 5 low, 17 moderate, 10 high, 0 critical.
- Current production dependency audit: 5 low, 17 moderate, 10 high, 0 critical.
- Remaining high/critical package names (full graph): nth-check, postcss, serialize-javascript, underscore, svgo, webpack-dev-middleware, node-forge.
- Remaining high/critical package names (production graph): nth-check, postcss, serialize-javascript, underscore, svgo, webpack-dev-middleware, node-forge.

Counts follow the repository's package-manager audit format and may count advisory paths differently across managers. For static CRA/Gatsby sites, a dependency marked production can still be a build tool; it is not evidence that a Node development server is deployed. Retained legacy-toolchain findings need follow-up, and must not be hidden with forced peer resolution or a react-scripts@0 replacement. Re-run the audits before merging because advisories change.

## Remaining acceptance gates

- Complete the checks on the final PR head and review a preview with isolated fixtures. Production promotion is a separate review step.

## Hosting, deployment and rollback

1. Review the PR and its checks. On Vercel, select **Node.js 24.x** in Project Settings and retain `engines.node: "24.x"`. Vercel selects the patch level; [runtime documentation](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions). Other hosts must use the committed .nvmrc/Node 24 Docker stages; Netlify reads the Node 24 build environment where configured.
2. Install with `yarn install --frozen-lockfile --non-interactive`, then run the checks above with test service values. Never test cron/reminder/bot writes with production tokens or databases.
3. After separate merge approval, build a new preview, verify public routes and fixture workflows, then separately approve production redeployment. Verify **the actual deployed Node 24 runtime** in provider logs/runtime metadata and exercise the application after rollout. This PR does not merge or promote production.
4. If rollout fails, restore the previous provider deployment/container image and revert this upgrade commit as needed. No application schema or saved-data migration is required. Preserve existing canvas documents, backups and databases. Returning to vulnerable versions is a temporary rollback and requires a replacement security fix.

## Ongoing maintenance

Dependabot is configured weekly for the applicable npm, GitHub Actions and Docker manifests. npm major-version updates are excluded so Next stays on the chosen major and Node typings stay on 24; Docker Node >=25 is excluded. Review minor/patch security PRs promptly. .nvmrc and CI's exact Node 24 patch also need refreshing when patched 24.x versions are released.

A repository administrator should enable **Dependency graph**, **Dependabot alerts**, **Dependabot security updates**, and **Grouped security updates** where available under Settings → Advanced Security / Code security. These account/repository settings were not changed by the source PR.

Migration references: [Next 15](https://nextjs.org/docs/app/guides/upgrading/version-15), [Next 16](https://nextjs.org/docs/app/guides/upgrading/version-16), [CRA deprecation](https://react.dev/blog/2025/02/14/sunsetting-create-react-app), [Node Sass end of life](https://sass-lang.com/blog/node-sass-is-end-of-life/).
