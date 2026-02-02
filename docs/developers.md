# Developers

FlipFlip is an Electron app written in TypeScript and React.

## Setup

You will need to download and install the following tools:

* [Git](https://git-scm.com/downloads)
* [Yarn](https://classic.yarnpkg.com/en/docs/install) (use Yarn classic 1.x)
* [NodeJS](https://nodejs.org/en/download/)

Then, in a Bash shell, run the following:
```sh
git clone https://github.com/ififfy/flipflip.git
cd flipflip
yarn install --dev

# terminal 1:
yarn development

# terminal 2:
yarn start

# app is now running, and you can reload at any time.
# uncomment the "open the dev tools" line in main.ts to get developer
# tools on launch.
```

## Node version

FlipFlip runs on the Node version bundled with Electron (v10.11.0). Tooling in
this repo uses a newer Node version for Yarn/Webpack; `.tool-versions` pins the
expected toolchain version. When changing code, avoid using Node APIs newer
than the Electron runtime.


## Build and package

Prereqs:

* Install dependencies: `yarn install --dev`
* Ensure the Node version from `.tool-versions` is active (asdf)
* `zip` is available on PATH (used by the release step)

To build and package:

* Run `make app`

The `app` target builds a production bundle and packages via
`electron-packager` (invoked through `npx`). The current `Makefile` packages
only Windows x64 and zips the result into `release/`. Uncomment the other
platform lines in `Makefile` if you need macOS or Linux packages.

## Making changes

Create a new branch, make your changes, and open a pull request. The
policy of the FlipFlip project is, "patches are generally accepted."
If your contributions make sense, you will be added as a collaborator
on the project to make changes as you wish. :-)

## JS style guide

* Use proper TypeScript. Some hacks are OK, but be reasonable.
* `import`, not `require`. (To make non-TypeScript modules work, add an entry
  to `src/declaration.d.ts`.)
* 2-space tabs.

## CSS style guide

* The top level of every React component simply has the component's full name as its CSS class
  (`<div className="Modal">`)
* Markup inside the component is `ClassName__Whatever` (`Modal__CloseButton`)
* For different states of the same component, make `m-blah` classes. (`Checkbox m-disabled`)
* For classes used on different kinds of elements, use `u-blah`, like `u-fill-screen`

## Contribution guidelines

* Try to keep the code repository and the application itself G-rated.
  If you want to break this guideline, email ififfy@mm.st and let's see
  if we can figure something out.
* Code needs to work on both Mac and Windows.
* The project is run on ["open open source"](http://openopensource.org)
  principles.
 