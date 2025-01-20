package cmd

import (
	"fmt"

	"github.com/spf13/cobra"
)

func VersionCommand() *cobra.Command {
	var versionCmd = &cobra.Command{
		Use:   "version",
		Short: "Print the version number of guard",
		Long:  `All software has versions. This is guard's 1.0.0`,
		Run: func(cmd *cobra.Command, args []string) {
			fmt.Println("Guard version 1.0.0")
		},
	}

	return versionCmd
}
