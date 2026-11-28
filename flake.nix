{
  description = "In-memory FileSystem for @effect/platform.";

  nixConfig = {
    extra-substituters = "https://nix.systemfsoftware.com";
    extra-trusted-public-keys = "nix-cache-1:wXA8I4DayNW9q6enUyQA/P/nT38pGSTLt374t3gsn7M=";
  };

  inputs = {
    core.url = "github:systemfsoftware/systemfsoftware/06ffbc5d0e96421d0745f81477fd6eaa815798e2";
    nixpkgs.follows = "core/nixpkgs";
    pnpm-release-management.url = "github:systemfsoftware/pnpm-release-management/3da32f4fa6f01af0a9a0cdab5cc8eb5d134b2de3";
    dprint.url = "github:systemfsoftware/dprint";
  };

  outputs = { self, nixpkgs, core, pnpm-release-management, dprint }:
    let
      lib = nixpkgs.lib;
      systems = [ "x86_64-linux" "aarch64-linux" ];
      forEachSystem = fn: lib.genAttrs systems (system: fn nixpkgs.legacyPackages.${system});

      # This repository's own public packages, as tarballs downstream flakes consume the same way.
      workspaceOf = pkgs:
        pnpm-release-management.lib.mkPnpmWorkspacePackages {
          inherit pkgs;
          src = self;
          pname = "effect-memfs";
          pnpm = pkgs.pnpm_12;
        };
    in
    {
      packages = forEachSystem workspaceOf;

      devShells = forEachSystem (pkgs: {
        default = pkgs.mkShell {
          packages = [
            dprint.packages.${pkgs.stdenv.hostPlatform.system}.default
            pkgs.nodejs_24
            pkgs.pnpm_12
          ];
        };
      });
    };
}
