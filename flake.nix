{
  description = "My Awesome Desktop Shell";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

    ags = {
      url = "github:aylur/ags";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    astal = {
      url = "github:aylur/astal";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs =
    {
      self,
      nixpkgs,
      ags,
      astal,
    }:
    let
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};
      extraPackages =
        (with ags.packages.${system}; [
          battery
          bluetooth
          network
          mpris
          notifd
          wireplumber
          hyprland
          tray
          apps
          # pkgs.fzf
        ])
        ++ (with pkgs; [
          libgtop
          lm_sensors
        ]);
    in
    {
      packages.${system} = {
        default = ags.lib.bundle {
          inherit pkgs;
          src = ./.;
          name = "mshell";
          entry = "app.ts";
          gtk4 = false;

          # additional libraries and executables to add to gjs' runtime
          inherit extraPackages;
        };

        wrapper = pkgs.writeShellScriptBin "mshell" ''
          # Exporting glib-networking modules
          export GIO_EXTRA_MODULES="${pkgs.glib-networking}/lib/gio/modules"
          if [ "$#" -eq 0 ]; then
              exec ${self.packages.${system}.default}/bin/mshell
          else
              exec ${ags.packages.${system}.io}/bin/astal -i mshell "$@"
          fi
        '';
      };

      devShells.${system} = {
        default = pkgs.mkShell {
          name = "mshell dev";

          buildInputs = with pkgs; [
            ags.packages.${system}.ags
            astal.packages.${system}.astal3
            astal.packages.${system}.io
            gjs
          ];

          shellHook = ''
            # Exporting glib-networking modules
            export GIO_EXTRA_MODULES="${pkgs.glib-networking}/lib/gio/modules"

            if [ "''${PWD##*/}" = "ags" ]; then
              echo "Generate types? (y/N)"
              read consent

              if [ "$consent" = "y" ]; then
                echo "Generating types..."
                ags types -d .;
              fi

              echo "Initialise astal (required for typescript server to work)? (y/N)"
              read consent
              if [ "$consent" = "y" ]; then
                mkdir -p node_modules;
                ln -sf ${astal.packages.${system}.gjs}/share/astal/gjs ./node_modules/astal
              fi

            else
              echo "You're not in the ags root directory, initialisation failed"
            fi
          '';
        };
      };
    };
}
